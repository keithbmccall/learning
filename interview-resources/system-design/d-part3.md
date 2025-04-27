# Part 3: Introduction - https://interviewing.io/guides/system-design-interview/part-three#part-3-intro

You’ve made it to Part 3! So far, you’ve learned high-level strategies (Part 1) and fundamental concepts (Part 2). Now it’s time to get practical. Part 3 is where all of these theories fit together into something you can actually **do**: learning a process to design systems.

> Want to know exactly what a FAANG system design interviewer looks for?  
> **Get detailed feedback** on your system design skills from our professional interviewers.  
> [See available times](#)

---

## About this 3-Step Framework

### Fundamentals

1. **Opinionated process**: Apply the same method to most system design interviews so you can focus on problem-solving rather than reinventing your approach.
2. **Three steps as functions**: Each step has inputs and outputs, so you can practice them in isolation.
3. **Systematic problem solving**: Learn 20% of concepts that address 80% of problems, and present yourself as a methodical architect.

### How to Use

- Practice each step separately.
- **Steps**:
    1. Requirements
    2. Data Types, Access Patterns & Scale
    3. Design
- Each chapter clearly states its inputs and outputs, and includes exercises.

### Limitations

- This is a **prescriptive** method and may not fit every question 100%.
- Adapt it to your style.
- **Don’t obsess over timing**—focus on mastering the task, not checking a clock.

---

## Overview of the 3 Steps

| Step | Inputs                                           | Outputs                                           |
|------|--------------------------------------------------|---------------------------------------------------|
| 1. Requirements                  | Problem statement                        | Functional & non-functional requirements          |
| 2. Data Types, API & Scale       | Requirements + problem statement        | Data types, access patterns, load & data scale    |
| 3. Design                        | All of the above                        | Data storage design & microservices architecture  |

---

## Step 1: Requirements

> **Inputs:** Problem statement  
> **Outputs:** List of functional and non-functional requirements

System design questions are open-ended and underspecified. **Don’t dive straight into design**—first ask the right questions to gather requirements.

### Rule of Thumb

- Interviewers withhold details. If they volunteer something specific (“30 days”), **it matters**.
- Cover both **functional** (“what the system does”) and **non-functional** (“how well it does it”).

### 1.1 Functional Requirements

1. **List business objects & relationships**
    - Treat the system as a black box—focus on *what*, not *how*.
2. **Clarify each object**
    - Which fields? Media? Mutable or immutable?
3. **Identify access patterns**
    - “Given X, return all related Y.”
    - E.g. Account → Tweets, Tweet → Likes, Account → Feed
4. **Validate & prioritize**

> **Tip:** Media is often important—ask if any objects hold images, video, etc.

#### Example: Twitter

- **Objects**: Account, Tweet, Follower
- **Relationships**:
    - Account follows Account
    - Account publishes Tweet
    - Tweet references Tweet (retweet)
- **Access patterns**:
    - Given an account, get their tweets
    - Given an account, get followers/following
    - Given an account, get feed (tweets from followed accounts)
    - Given a tweet, get likes/retweets

---

### 1.2 Non-Functional Requirements

> **Inputs:** Functional requirements  
> **Outputs:** Performance, availability, security goals

Common NFRs:

- **Performance**: Which synchronous, user-facing features need low latency?
- **Availability**: What’s the cost of downtime? (e.g., Twitter—five-nines; banking—consistency over availability)
- **Security**: Any special constraints? (e.g., sandboxing user code, data encryption)

#### Rule of Thumb

- **Don’t state platitudes**—tie each NFR to a trade-off.
- **Relax one requirement** if it’s non-critical (e.g., “eventual consistency is fine here”).

#### Example: TikTok vs. Code Deployment

| System                         | Performance                | Availability                    | Security                                  |
|--------------------------------|----------------------------|---------------------------------|-------------------------------------------|
| TikTok                         | Feed must load instantly   | Near-zero downtime              | Standard HTTPS + auth                     |
| Internal code deployment tool  | Deploy within 1 hour       | 99.9% uptime acceptable         | High-trust code, no sandboxing needed     |

---

## Step 2: Data Types, API & Scale

> **Inputs:** Requirements + problem statement  
> **Outputs:** Data types, access patterns (API), request & data scale

Before sketching architecture, answer:

1. **What data types**?
    - Structured (business objects) vs. blobs (media).
2. **What API**?
    - Design HTTPS endpoints for each access pattern.
3. **What scale**?
    - Read- vs. write-heavy?
    - Back-of-envelope math (use round, power-of-10 numbers).

### 2.1 Data Types

- List entities and media.
- E.g. **Twitter**:
    - Structured: Account, Tweet, Follower
    - Media: Image/Video in Tweets

### 2.2 API Design

Map access patterns to REST endpoints:

```yaml
getTweets:
  GET /accounts/{id}/tweets?pageToken={token}
  returns: paged list sorted by timestamp desc

getFeed:
  GET /accounts/{id}/feed?pageToken={token}
  returns: paged list of tweets from followed accounts

postTweet:
  POST /accounts/{id}/tweets
  body: { content, mediaUrl? }

retweet:
  POST /accounts/{id}/retweets
  body: { tweetId }
