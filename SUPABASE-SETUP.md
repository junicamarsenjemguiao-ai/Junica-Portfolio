# Community Forum — Supabase backend setup

Follow these four steps. Until you finish step 3, the forum keeps working
exactly as it does now (local only), so nothing breaks in the meantime.

---

## 1. Create the project

1. Go to <https://supabase.com> → **New project**
2. Name it (e.g. `jmj-portfolio`), choose a region near you — **Southeast Asia (Singapore)**
   is the closest to the Philippines — and set a database password
3. Wait for provisioning (~2 minutes)

## 2. Create the table

Open **SQL Editor** → **New query**, paste this, click **Run**:

```sql
-- Safe to run more than once: every statement tolerates already existing.
create table if not exists public.cc_messages (
  mid        text primary key,
  sid        text not null,
  ts         bigint not null,
  data       jsonb not null,
  created_at timestamptz default now()
);

create index if not exists cc_messages_ts_idx on public.cc_messages (ts);

alter table public.cc_messages enable row level security;

drop policy if exists "public read"   on public.cc_messages;
drop policy if exists "public insert" on public.cc_messages;
drop policy if exists "public update" on public.cc_messages;
drop policy if exists "public delete" on public.cc_messages;

create policy "public read"   on public.cc_messages for select using (true);
create policy "public insert" on public.cc_messages for insert with check (true);
create policy "public update" on public.cc_messages for update using (true) with check (true);
create policy "public delete" on public.cc_messages for delete using (true);

-- Adding a table twice raises 42710; swallow it so re-runs stay clean.
do $$
begin
  alter publication supabase_realtime add table public.cc_messages;
exception
  when duplicate_object then null;
end $$;
```

## 3. Keys — already done ✅

Your project is already wired into `script.js`:

```js
const CC_SUPABASE = {
  url:  'https://tyodziovdsjuyjeyusxk.supabase.co',
  anon: 'sb_publishable_1ETBKIErdqGSAyUfg_IXKg_dozE6Pl3'
};
```

Just commit, push, hard-refresh. The console logs
`[community] Supabase backend active` when it connects.

**If you see a 401 on connect:** this is the newer `sb_publishable_...` key
format. Some projects still expect the legacy JWT — grab the **anon public**
key from Settings → API and swap it into the same `anon` field.

## 4. Check it works

Open **`/supabase-check.html`** on your deployed site. It tests each link in the
chain and prints PASS/FAIL per step, with the exact fix for whichever fails.
Or type `jmjBackend()` in the browser console for a one-line status.


Open the site on your phone **and** your laptop at the same time:

- A message sent on one appears on the other within a second, with no refresh
- Both avatars appear in the office and move live as you use the arrow keys
- Reload the page — the conversation is still there (it's in the database now)

---

## How it works

| Feature | Transport | Stored? |
|---|---|---|
| Messages, stickers, replies | `cc_messages` table + realtime INSERT | Yes |
| Edits and reactions | realtime UPDATE | Yes |
| Deletes | realtime DELETE | Yes |
| Office avatar movement | realtime **broadcast** | No — ephemeral |

Movement is broadcast rather than written to the database on purpose: positions
change many times per second and would otherwise flood the table.

If Supabase is unreachable, the client falls back to local-only mode instead of
breaking — messages still send and render for that visitor.

---

## ⚠️ Read this before going live

**The anon key is public and these policies allow anyone to edit or delete any
message.** That's fine for a friendly portfolio forum, but it is not secure: a
determined visitor could wipe the table. The client sends its own `sid`, and an
anonymous client can spoof it, so ownership cannot be enforced from the browser.

### Locking it down (recommended — 5 minutes)

The client already calls `signInAnonymously()` on connect, so this works as soon
as you flip the switch:

1. **Authentication → Providers → Anonymous sign-ins → Enable**
2. Run this SQL to tie each message to its author:

```sql
alter table public.cc_messages add column if not exists uid uuid default auth.uid();

drop policy if exists "public update" on public.cc_messages;
drop policy if exists "public delete" on public.cc_messages;

create policy "author update" on public.cc_messages
  for update using (uid = auth.uid()) with check (uid = auth.uid());
create policy "author delete" on public.cc_messages
  for delete using (uid = auth.uid());
```

Reading and posting stay open to everyone; only the person who wrote a message
can edit or delete it. Do this **after** step 4 confirms the basics work, so you
know which change caused a problem if one appears.

**Free tier limits:** 500 MB database, 2 GB bandwidth, 200 concurrent realtime
connections — far beyond what a portfolio needs.

**Optional housekeeping** — keep only the last 500 messages:

```sql
create or replace function trim_cc_messages() returns trigger as $$
begin
  delete from public.cc_messages
  where mid in (
    select mid from public.cc_messages order by ts desc offset 500
  );
  return null;
end; $$ language plpgsql;

create trigger cc_messages_trim
after insert on public.cc_messages
execute function trim_cc_messages();
```


---

# Booking ("Book a chat")

The contact section has a **Book a chat** row. It runs one of two ways.

## Option A — Google Calendar (already wired ✅)

`script.js` is set to your appointment schedule:

```js
const BOOKING = {
  calendly: '',
  googleUrl: 'https://calendar.app.google/XmD6TrvMow25Mzg48'
};
```

The modal embeds that page, so visitors book straight into your calendar. No
table, no policies, nothing to confirm by hand.

**One caveat worth checking after you deploy:** Google sometimes refuses to be
displayed inside another site (an `X-Frame-Options` restriction that varies by
account). If the embed area looks blank, the modal automatically swaps in an
"Open my booking page" button, and there's a permanent "open my calendar page"
link under the form either way — so booking always works. If you'd rather it
always embed, Calendly permits framing everywhere; paste a Calendly link into
`calendly:` and it takes priority.

The modal then embeds your real availability and visitors book straight into
your calendar. Nothing else to configure — no table, no policies.

To get a Google link instead: Google Calendar → **Create → Appointment schedule**
→ set your hours → **Share** → copy the booking page link.

## Option B — collect requests in Supabase (no third-party account)

Leave both fields blank and the form saves requests to your database, which you
confirm by email. Run this once in the SQL Editor:

```sql
create table if not exists public.cc_bookings (
  id         bigint generated always as identity primary key,
  name       text not null,
  email      text not null,
  topic      text,
  slot       text,
  tz         text,
  note       text,
  created_at timestamptz default now()
);

alter table public.cc_bookings enable row level security;

-- Visitors may request a slot, but must not be able to read other people's
-- requests: insert-only for the public.
drop policy if exists "public book" on public.cc_bookings;
create policy "public book" on public.cc_bookings for insert with check (true);
```

Then expose the table: **Integrations → Data API → Exposed tables → tick
`cc_bookings` → Save** (the same step that fixed the chat).

Read the requests in **Table Editor → cc_bookings**.

### If the save fails
The form never loses a request — it falls back to opening the visitor's email
app with the details pre-filled, addressed to you.

### Privacy note
Booking rows hold a name and email address. The policy above is **insert-only**,
so no visitor can read them back through the API — only you, in the dashboard.
Don't add a public `select` policy to this table.
