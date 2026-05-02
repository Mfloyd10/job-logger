# Job Logger App

Take-home assignment for Built By The Trades.

## What I Built
I produced a full-stack job logging web app built with Next.js (App Router, TypeScript) and Supabase (Postgres).
Trade business owners have the ability to log completed services by noting the service type, the invoiced amount,
the date completed, and any notes for the customer. Submissions are then saved to a Supabase database and displayed
in a live feed of the 10 most recent jobs, newest first, along with a running total of all invoiced amounts.

## What Would I do With More Time
I would fully polish the UI, adding branding and a more modern interface. I would include accounts 
for users with validation (Rather than assuming there is only one). I would allow the ability to delete
and edit existing job logs, as well as the ability to limit or extend the 10 jobs shown. I would also
allow users to see a more detailed description of the job: materials, hours worked, exact times, labor
from others, etc. Then incorporate a way to check that these prices and hours are on par with current market
trends (Probably using some type of AI). 

## One Thing I'd Ask a Teammate
I'm new to Supabase and Postgres (Backend flow in general); I'd ask a teammate about the best practices
for performing queries as an app grows. I would also make sure I am making database calls correctly,
as well as sending data correctly to the backend.

## One Thing I Learned from Claude Code
I learned that Claude Code is a powerful tool for coding purposes, compared to something like ChatGPT. It is 
exceptional at walking me through new technologies, as well as being able to accurately identify my shortcomings
and take them into account while walking me through the code. Altogether a great companion when learning technologies.

## Some Key Prompts I Used
- "How do I handle form submission with supabase, ive never used it before." Claude walked me through a full Supabase setup: installing the client, creating the lib/supabase.ts file, setting up tables using the UI, etc., all step by step.
- "How would I go about pulling data from the database?" Claude showed me useEffect and async functions (Though I was aware of these from my SWE class), as well as the Supabase select/order/limit pattern for fetching recent jobs.

## Overall Enjoyment
Just as a personal side note, I enjoyed working on this small assignment greatly. It opened me up to new technologies I hadn't previously worked with, while also giving me a small enough task that I could learn from. Utilizing Claude Code as a companion rather than something to stay away from greatly increased the speed of my workflow, allowing me to learn new technologies quickly and effectively. This type of work is what I'm looking forward to in the future!
