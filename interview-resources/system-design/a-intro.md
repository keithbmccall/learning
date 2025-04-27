# Part 1: Introduction - https://interviewing.io/guides/system-design-interview#introduction-to-system-design

# What this guide is and whom it's for

Candidates often get overwhelmed with system design. We don’t blame them—there are literally hundreds of topics you can study when preparing for an interview. But does that mean you should drop everything and study all of them? Absolutely not. It’s vital to master the basic principles first.

Mastering the fundamentals will go a long way in system design. When you’re new to a subject, studying too much over a short period can lead to diminishing returns and actually hurt you in a real interview. Early in your preparation, it can help to know more and have more options, but this can also cause you to feel overwhelmed by the sheer number of potential answers, possibly leading you toward over-complicated solutions.

> **80/20 Rule:** Our experience shows that 80% of system design interviews involve only 20% of the concepts. This guide teaches those key concepts in depth to increase your odds of excelling during an interview.

**Primary audience:** Backend-leaning engineers interviewing for mid- to senior-level roles. Whether you’re new to system design interviews or a seasoned interviewer looking to refresh your skills, this guide is for you.

---

## How we made this guide

1. **Listening:** 30+ hours of system design interviews and lessons.
2. **Data analysis:** Identified 50+ of our highest-rated interviewers.
3. **Validation:** Engineers new to system design took our ideas for a spin.

Our unique data set (collective interviewer knowledge + recorded interviews) makes us well-equipped to tell you exactly what to expect. If we discuss something here, it’s likely to appear in 80% of mid- to senior-level interviews.

> Read on to gain insight from the people on the other side of the table—the minds of your interviewers.

---

## How to use this guide

This guide is structured into **4 parts**:

1. **How to approach a system design interview**
2. **Key topics to understand**
3. **A 3-step framework to crush any system design interview**
4. **Watch us design popular systems from scratch, and learn how to get unstuck**

- **New to system design?** Read Parts 1–4 in order.
- **Experienced?** Begin with Part 4, then review Parts 1–3 as needed.

> We want to give you a shortcut to interview success—while still encouraging the sweat equity required to learn system design deeply. No royal roads, but cheat codes along the way.

---

## Editor’s note

We use the terms **“machine,” “server,”** and **“node”** interchangeably throughout this guide.

---

## Table of Contents

> The “Table of Contents,” located on the left side of the screen, helps you navigate. Revisit conceptual sections for a refresher or fast-forward to topics you need most.

> **Time commitment:** ~6 hours total (3.5 h reading + 2.5 h videos).

---

## Rule of thumb

> **If you have an upcoming system design interview and you're vastly unprepared, the best thing you can do is reschedule.**  
> *Exceptions:* Extenuating circumstances requiring urgent employment (e.g., visa issues).

---

## Legend

- **Rule of thumb**
- **Question**
- **Anecdote**
- **Outlaw idea***
- **Remember**
- **Warning**
- **Tip**
- **How to Get Yourself Unstuck**

> *An “outlaw idea” is a divergent or controversial idea.

---

# Part 1: Introduction to System Design

You may be reading this because you recently failed a system design interview, watched an overwhelming YouTube video, or have years of experience yet struggle to demonstrate your skills in a one-hour interview.

> **Do not panic!**

Professional experience with distributed systems isn’t required to pass. Even experienced distributed-systems engineers can bomb the interview format. Performance in an interview measures *interview skill*, not your worth as a software engineer.

### Anecdote

> One expert was asked: “As an experienced engineer without scalable-systems experience, how can I nail a FAANG system design interview?”
>
> “I worked at Facebook for five and a half years. I learned more about system design from the internal interviewing wiki than from real work. Distributed-systems folk build the libraries and backends so the rest of us never have to think about them. I learned almost nothing about designing systems on the job.”

> **Remember:** You can pass even if you’ve never designed distributed systems. If you’ve copied files between machines or opened network connections—you’re already halfway there.

---

## The difference between engineering problems and design problems

> “There’s a difference between design problems and engineering problems…  
> Engineering problems have one best solution (hinges that last 10,000 cycles).  
> Design problems have no predetermined outcome (mini trackballs under a keyboard).  
> When the outcome is clear but the path isn’t, you prototype, brainstorm, and ‘build your way forward.’ Great design can’t be solved with equations alone—it has an aesthetic, a ‘feel’ you know when you see it.”

Design problems require iteration, creativity, and collaboration—especially in interviews. The less code you write, the better.

---

## How approaching a system design interview is different than a coding interview

- **Coding** is *retrieving* a solution (science).
- **System design** is *creating* a solution (art).

You’re drawing a map for others to implement—you ask questions, sketch components, and explain your reasoning. Think like a Tech Lead mentoring a junior engineer, not like a coder.

### Anecdote

> “Pretend it’s 1999—no fancy frameworks, just you and your schoolmates in a garage. The MVP must ship tomorrow. Design so your friends can code it up today—fast and simple.”

---

## Communication is king

In system design, communication is more important than raw coding skill. Interviews are conversational—prepare to adjust your style to different interviewers.

> **There are no optimal solutions**—different experts produce different, equally valid designs.

---

## What your interviewer looks for

- **Wants to see:**
    - Broad, base-level understanding of fundamentals
    - Back-and-forth about constraints
    - Well-reasoned, qualified trade-off decisions
    - Unique directions driven by your experience
    - A holistic view of system and users

- **Doesn’t care about:**
    - Deep domain expertise
    - Assumptions not discussed
    - Ironclad “right” answers
    - A predefined step-by-step path
    - Only technical considerations

> **Remember:** Interviewers expect you to know many topics at a high level, not the internals. They focus on *how* you approach problems, not on *perfect* solutions.

---

## Red flags & green flags

Use these signposts to gauge and steer your interview:

- **Red Flag #1:** “Just talk to keep the game going.”
- **Green Flag #1:** Communicate honestly about what you know and don’t know.

- **Red Flag #2:** Pushing against interviewer feedback without thought.
- **Green Flag #2:** Treat it like a collaboration—integrate feedback.

- **Red Flag #3:** Skipping interviewer questions and prompts.
- **Green Flag #3:** Let the interviewer drive focus and pace (mid-level). Senior roles may take more control.

- **Red Flag #4:** Long stretches of silence without acknowledgment.
- **Green Flag #4:** Pause to collect thoughts, then share clearly.

> **Tip:** In Part 4 we’ll teach you how to get unstuck and what to say when you are.

---

## Decision-making in interviews

- **Don’t say:** “We could use DB A, DB B, or DB C…” *(and then choose none)*
- **Do say:** “We could use A, B, or C. Based on trade-offs, I’ll use B.”

> **Remember:** Use generic component names (e.g., “a queue,” not “Kafka”) unless you can justify the brand choice.

---

**You’ve finished Part 1!**  
Continue to Parts 2–4 to learn the 15 fundamental concepts, see two experts tackle the same design problem, and master advanced tips and unsticking strategies.
