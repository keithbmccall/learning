# Part 2: Introduction - https://interviewing.io/guides/system-design-interview/part-two#part-2-introduction

If you read Part 1, then you should have a mental model of what a system design interview looks like. You also learned common pitfalls to avoid and discovered high-level strategies to prepare you for your interview. Like Part 1, Part 2 is still introductory and grounded in theory, providing you with a 30,000-foot overview of the whole case. Part 2 is more targeted, however, and we’ll begin by teaching you **15 fundamental system design concepts** that will help you succeed in your interview.

---

## About these 15 fundamental concepts

The first three concepts aren’t purely technical—they’re based on tacit knowledge. We learned these through collectively experiencing thousands of hours of system design interviews, but you’ll be able to glean these insights quickly. The final 12 concepts are purely technical.

### One note about the 12 technical topics

We’ve identified two categories of technical concepts:
- **Know quite well** (covered in this guide)
- **Worth knowing a little** (will be added in future iterations)

### Remember

> There are endless things you could learn about system design, but Part 2 focuses on the 12 technical concepts that will give you the best bang for your buck. By the end of Part 2, you’ll understand these topics well enough in theory to begin practicing them (Parts 3 & 4).

---

## Three core concepts for system design interviews

### a. There’s no right way to design a system

By now you’ve heard “there’s no right way to design a system.” How do you know for sure?  
**Watch these videos** of two experts designing the same system side by side. Notice how they guide the interview toward their strengths and openly admit gaps in their understanding.

- **Part 1**
- https://www.youtube.com/watch?v=Zi0pPkiFemE
- **Part 2**
- https://www.youtube.com/watch?v=PU_sgwZvm6s

> **This is one of the most important lessons in the entire guide.**

---

### b. General rules of thumb

#### Interviewer behavior

- If the interviewer interrupts you, you’re probably going off track.
- If they suggest another avenue, pause, ask clarifying questions, then proceed.
- It’s fine to be asked questions; it’s bad if they *tell* you how to do things—they’re signaling you need help, which lowers your score.

#### Prior experience affects both sides

- **Familiar domain:** Show off your expertise—this should be easy.
- **Unfamiliar domain:** Use best judgment, be honest about gaps, ask questions, and demonstrate curiosity.

> **Tip:** If you know a bit about your interviewer’s background, you can anticipate their focus.

#### Time management

> It’s more important to cover everything broadly than to explain every detail.  
> The interviewer asks, “Could this person get an MVP off the ground?” If “no,” you lose.

#### Approaching the problem

- **Explain *why***, not just *what*.
- The first rule of distributed systems: **avoid them if you don’t need them!**
- Aim for simple solutions first—complex designs require more assumptions.
- Admit when you don’t know something—see concept (c) below for how.

#### A likely pitfall

Once you’re competent, **communication** matters more than design.
> Mock interviews with varied interviewers or a dedicated coach will help refine your communication.

---

### c. Exactly what words to say in specific scenarios

#### What to say when you don’t know what to do

There are levels of “not knowing”:

##### Candidate #1
Knows load balancers inside and out.
> **Tip:** Strut your stuff—share your deep knowledge confidently.

##### Candidate #2
Knows what a load balancer *is*, but not the algorithms.
> **Best response:**  
> “I don’t know the details, but I’ll look it up right after this. If I had to guess, I’d say [x] because [reason].”  
> Other buffer phrases:
> - “Don’t hold me to this, but…”
> - “I’ve read about [topic]; I’d approach it by [idea].”
> - “This reminds me of a project where I…”
> - “This is interesting—tell me more about that.”

##### Candidate #3
Has *never* heard of a load balancer.
> **Best response:**  
> “I’m not familiar with load balancers—could you explain briefly? Then I’d approach it by…”

---

#### How to push back against your interviewer in a helpful way

> **Example:**  
> **Interviewer:** “I wouldn’t use a cache here.”  
> **You:** “Sure. I’m sorry, but if we remove the cache, won’t that lead to [impact]? Do you see a better alternative?”

> **Tip:** Start with “Sure,” “OK,” or “I’m sorry” to keep the tone collaborative. Use “we” or “let’s” to build empathy.

---

#### Handwave stuff for the sake of time

No real system can be fully designed in 40–60 minutes.
> **Remember:** It’s more important to cover everything broadly than to deep-dive every detail.  
> **Tip:** “Let’s skip that rabbit hole for now and revisit if there’s time.”

---

#### The two types of interviewers

- **Warm:** Collaborative, asks questions, gives feedback.
- **Cold:** Expects you to drive the solution with fewer checks.

> **Outlaw idea:** Interviewers often think they’re helping—you’ll notice they fall into two styles.

> **Tip:** Practice with both types to adjust your style.

---

### How to treat the two types of interviewers

- **Cold interviewer:**
    - Speak with confidence:
      > “Correct me if I’m wrong, but I think X because Y.”  
      > “Stop me if I’m off track; I’d do X because Y.”
    - Less thinking out loud; pause to collect thoughts.

- **Warm interviewer:**
    - Ask clarifying questions and treat them like colleagues:
      > “I think we can do X, Y, or Z; personally I’d choose X because… What do you think?”

> **Warning:** Asking too many trivial questions can make you seem junior. Check in at major milestones only.

---

## 12 Fundamental (Technical) System Design Concepts

1. **APIs**
2. **Databases (SQL vs NoSQL)**
3. **Scaling**
4. **CAP theorem**
5. **Web authentication & basic security**
6. **Load balancers**
7. **Caching**
8. **Message queues**
9. **Indexing**
10. **Failover**
11. **Replication**
12. **Consistent hashing**

We'll cover each in detail in the next sections.

---

## Part 2 Outro

Great work! You made it through the theory 🔥 Achievement unlocked 🤖  
Now you’re ready for Parts 3 & 4, where we get **practical**, build systems from scratch, learn how to get unstuck, and master a 3-step framework to crush any system design interview.
