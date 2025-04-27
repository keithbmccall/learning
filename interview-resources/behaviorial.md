# 🧠 Amazon Behavioral Interview Cheat Sheet

---

## ✅ Story: Decreasing Bandwidth in Frontend

**Leadership Principles:**  
Customer Obsession, Ownership, Dive Deep, Insist on the Highest Standards

**S (Situation):**  
While working on the Checkout funnel at Walmart.com, I noticed the backend team was planning to introduce a new call to the Accounts service to fetch user data. From my knowledge of the frontend codebase, I was aware we already had an existing call to that service.

**T (Task):**  
I wanted to find a way to eliminate redundancy and reduce unnecessary frontend work and network load, especially for users on low-powered devices.

**A (Action):**  
I investigated the purpose of the existing frontend call and reached out to the owning team to understand their requirements and constraints. After confirming the overlap, I proposed consolidating the logic and worked with backend, frontend, and product teams to get buy-in for eliminating the extra frontend call.

**R (Result):**  
We removed the redundant call, reduced load time, improved the user experience on lower-end devices, and reduced maintenance efforts on the frontend.

**Sample Questions:**
- Tell me about a time you improved a customer experience.
- Tell me about a time you proactively solved a technical issue.
- Tell me about a time you didn’t compromise on quality.

---

## ✅ Story: GitHub Commit Tool

**Leadership Principles:**  
Invent and Simplify, Bias for Action, Deliver Results

**S (Situation):**  
Our weekly release process involved manually reviewing GitHub commits to identify changes that needed QA validation, a process that was both time-consuming and error-prone.

**T (Task):**  
I aimed to create a system that could automatically surface the commits relevant to each release to simplify and speed up the validation process.

**A (Action):**  
I developed a tool that queried GitHub to list all commits from our team included in a release. This tool became the source of truth for QA validations and documentation.

**R (Result):**  
The tool saved multiple hours per release, streamlined communication with QA, and improved the overall reliability of our release process.

**Sample Questions:**
- Tell me about a complex problem you solved with a simple solution.
- Give me an example of a calculated risk that you took.
- Tell me about a time where you exceeded expectations.

---

## ✅ Story: Checkout State Machine

**Leadership Principles:**  
Think Big, Learn and Be Curious, Ownership, Invent and Simplify

**S (Situation):**  
While rebuilding Walmart.com, we needed a modern, scalable solution for managing the guest checkout flow. The old system could not support new features effectively.

**T (Task):**  
I volunteered to design and build a new state machine that could handle user interactions efficiently across multiple platforms.

**A (Action):**  
I collaborated with product and senior engineers, researched best practices, and designed a system using React’s `useReducer` and `useEffect`. I also coordinated with the orchestration team to shift fulfillment logic out of the frontend, reducing redundancy.

**R (Result):**  
We launched a maintainable and scalable state machine that reduced future feature implementation by two sprints, streamlining code across platforms.

**Sample Questions:**
- Give me an example of a radical approach to a problem.
- Tell me about a time you learned something new to solve a problem.
- Tell me about something you took on outside your responsibilities.

---

## ✅ Story: GitOps – Difficult Teammate

**Leadership Principles:**  
Earn Trust, Have Backbone; Disagree and Commit, Hire and Develop the Best

**S (Situation):**  
During a holiday initiative, I joined a GitOps tooling project already in progress. The teammate I was paired with had made architectural decisions that created blockers and wasn’t very receptive to feedback.

**T (Task):**  
I needed to help move the project forward and improve its quality without causing friction.

**A (Action):**  
I separated non-negotiable issues from subjective opinions and asked questions to understand my teammate’s decisions. This led to a productive discussion, and I offered alternative approaches with clear reasoning.

**R (Result):**  
We resolved key architectural issues, completed the project, and built a stronger working relationship. The experience also sharpened my skills in influencing without authority.

**Sample Questions:**
- Give an example of a time you received or delivered tough feedback.
- Tell me about a time you had to disagree with a peer.
- How have you helped others grow?

---

## ✅ Story: Walmart Day – Picking Up Abandoned Work

**Leadership Principles:**  
Ownership, Deliver Results, Bias for Action

**S (Situation):**  
Midway through a project, several teammates left the company, leaving behind partially completed work with poor documentation.

**T (Task):**  
I had to take ownership of a complex, abandoned project and drive it to completion despite minimal context.

**A (Action):**  
I reverse-engineered the work, reached out to key stakeholders for clarification, and compiled comprehensive documentation. I also supported my teammates by sharing my findings to remove blockers.

**R (Result):**  
The project was delivered on time, and the improved documentation streamlined future onboarding and reduced ambiguity.

**Sample Questions:**
- Tell me about something outside your scope that you owned.
- Tell me about a time you had to step up quickly.
- How did you meet goals in a challenging situation?

---

## ✅ Story: GDI Conflict – Enum vs String

**Leadership Principles:**  
Have Backbone; Disagree and Commit, Dive Deep, Earn Trust

**S (Situation):**  
During a Guided Delivery project, teams disagreed on whether to use string literals or Enums for delivery location types in our GraphQL API.

**T (Task):**  
I believed Enums were safer and offered clearer documentation, so I set out to align cross-team standards.

**A (Action):**  
I organized a cross-team meeting with stakeholders from Accounts, InHome Delivery, and our OL team. We discussed the trade-offs of each option and prioritized long-term maintainability.

**R (Result):**  
We decided to use Enums, which improved clarity and security across systems, and I strengthened inter-team trust and communication.

**Sample Questions:**
- Tell me about a time you influenced a tough decision.
- Describe a time you had to dive deep to solve a problem.
- How did you earn trust while managing conflict?

---

## ✅ Story: Sacramento Store Default Bug

**Leadership Principles:**  
Dive Deep, Customer Obsession, Ownership

**S (Situation):**  
On Walmart.com, users changing their addresses to areas without local fulfillment were automatically defaulted to the Sacramento store—a behavior that didn’t make sense for them.

**T (Task):**  
I wanted to understand why this happened and explore a better customer experience.

**A (Action):**  
I investigated by reaching out to owners of multiple systems (Location, Store Fulfillment, Scheduling Promise, and Product) to trace the logic behind this fallback behavior. I discovered unhandled scenarios in the default store assignment and proposed notifying users instead of defaulting them.

**R (Result):**  
My investigation revealed a longstanding UX flaw, leading to a broader product discussion on improving edge-case behavior. It also improved cross-team understanding of the fulfillment process.

**Sample Questions:**
- Tell me about a time you had to dive deep to understand a complex problem.
- Describe a time you improved a customer experience.
- Tell me about a time you took on additional responsibilities.

---

## ✅ Story: A Time You Failed – Shipping Strategy Enhancement

**Leadership Principles:**  
Learn and Be Curious, Ownership, Earn Trust

**S (Situation):**  
A couple of years back, I led a project that introduced a feature allowing customers to select their shipping strategy. I also saw an opportunity to improve an existing post-transaction call by caching additional data on the frontend to reduce backend overhead.

**T (Task):**  
I took the initiative to explore this improvement, coordinating with the feature owners to gather detailed requirements and propose a design change that would streamline our call pattern.

**A (Action):**  
I pushed for the change and lobbied my team to implement it. We developed the new approach and conducted extensive testing. However, during end-to-end testing, QA caught that we’d missed a critical null check, which adversely affected an already-launched feature. We had to roll back the additional changes temporarily, and I later coordinated the fix post-launch.

**R (Result):**  
While the failure was disappointing, it taught me vital lessons about the importance of comprehensive test documentation and rigorous regression testing. This experience reinforced my commitment to quality and continuous learning, ensuring that I approach future improvements with greater care.

**Sample Questions:**
- Tell me about a time you failed and what you learned from it.
- Describe a challenging project where things didn’t go as planned.
- How do you handle mistakes, and what steps do you take to prevent them in the future?
