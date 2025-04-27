# System Design Mastery Guide for Senior Engineers

Your interview is in **2 weeks**. Use this guide to structure deep, focused preparation, covering each core concept with detailed explanations, technology choices and trade-offs, and resources for further study.

---

## 1. APIs

APIs (Application Programming Interfaces) define the contracts by which clients and services communicate. Good API design balances **usability**, **evolvability**, and **performance**. Consider versioning, idempotency, error handling, and rate limiting. Choose a protocol and style that aligns with your system’s requirements—whether it’s a human-facing REST endpoint, a service-to-service gRPC stream, or real-time WebSocket connection.

| Technology       | Pros                                                        | Cons                                                   |
|------------------|-------------------------------------------------------------|--------------------------------------------------------|
| **REST (HTTP)**  | Ubiquitous; easy to cache; simple CRUD mapping              | Over-/under-fetching; verbose payloads; less ideal for real-time |
| **GraphQL**      | Precise data fetching; schema introspection; single endpoint | Complex server logic; harder to cache; overly flexible queries |
| **gRPC (HTTP/2)**| High performance via HTTP/2 multiplexing; strong typing     | Requires code-gen; binary protocol harder to debug; limited browser support |
| **WebSockets**   | Full-duplex communication; low latency for real-time apps    | Stateful; scaling requires sticky sessions; complex reconnect logic |

**Further Reading**: [REST API Concepts and Examples (YouTube)](https://www.youtube.com/watch?v=7YcW25PHnAA)

---

## 2. Databases (SQL vs. NoSQL)

Data storage is foundational. Weigh **schema flexibility**, **transaction support**, **query complexity**, and **scalability**. Relational DBs excel at **ACID** transactions and **joins**, while NoSQL stores shine when you need horizontal scale or handle unstructured data. Consider access patterns: mostly reads or writes? Strong consistency or eventual?

| Technology     | Pros                                                      | Cons                                                    |
|----------------|-----------------------------------------------------------|---------------------------------------------------------|
| **PostgreSQL** | ACID compliance; rich SQL querying; extensions (PostGIS)  | Harder horizontal sharding; disruptive schema migrations |
| **MongoDB**    | Flexible schema; easy auto-sharding                       | Weaker multi-doc transactions; potential inconsistency   |
| **DynamoDB**   | Fully managed; seamless scale; single-digit ms latency    | Can be expensive; eventual consistency by default       |
| **Cassandra**  | High write throughput; multi-DC replication               | Poor for ad-hoc queries; eventual consistency required  |

**Further Reading**: [Difference Between SQL and NoSQL (GeeksforGeeks)](https://www.geeksforgeeks.org/difference-between-sql-and-nosql/)

---

## 3. Scaling

Scaling handles growth in **traffic**, **data**, or **users**. **Vertical scaling** adds CPU/RAM to one node; **horizontal** adds more nodes. Plan data partitioning, stateless vs. stateful services, and auto-scaling. **Serverless** reduces ops burden but has cold starts and duration limits.

| Pattern/Service          | Pros                                                  | Cons                                          |
|--------------------------|-------------------------------------------------------|-----------------------------------------------|
| **Vertical Scaling**     | Simple; immediate boost                              | Expensive at high specs; single point of failure |
| **Horizontal Scaling**   | Near-infinite growth; commodity hardware              | Requires load balancing & partitioning         |
| **Auto-Scaling Groups**  | Adjusts to real-time load; cost-efficient             | Needs tuned metrics; risk of oscillation       |
| **Serverless (Lambda)**  | No infra-ops; pay-per-invoke                          | Cold starts; limited execution time            |

**Further Reading**: [Scalability Basics (Cloudflare)](https://www.cloudflare.com/learning/performance/scalability/)

---

## 4. CAP Theorem Strategies

The **CAP theorem** says you can only guarantee two of: **Consistency**, **Availability**, **Partition Tolerance**. In practice, partitions occur, so you choose between **CP** (strong consistency, may reject writes), **AP** (always up, may serve stale data), or **eventual consistency**. Align choices with SLAs and client expectations.

| Strategy                     | Pros                                            | Cons                                           |
|------------------------------|-------------------------------------------------|------------------------------------------------|
| **CP (Consistency + PT)**    | Guarantees up-to-date data                      | May reject operations during partitions       |
| **AP (Availability + PT)**   | Always responds                                 | Reads may be stale                            |
| **CA (Consistency + Avail.)**| Simple when no partitions                       | Impossible under real WAN partitions          |
| **Eventual Consistency**     | High uptime; async replication                  | Clients handle stale data & merge conflicts   |

**Further Reading**: [CAP Theorem Explained (Computerphile YouTube)](https://www.youtube.com/watch?v=F2dbm2bgsv8)

---

## 5. Authentication & Security

Secure systems verify **identity** (authentication) and control **access** (authorization). Choose protocols and token formats, manage secrets, and enforce TLS. Plan for SSO needs, session revocation, and guard against CSRF, XSS, and injections.

| Technology             | Pros                                                   | Cons                                      |
|------------------------|--------------------------------------------------------|-------------------------------------------|
| **OAuth 2.0**          | Standard delegated access; wide support                | Complex flows; security pitfalls if misconfigured |
| **JWT**                | Stateless; easy cross-service                         | Hard to revoke; must handle expiry securely |
| **SAML**               | Enterprise SSO; robust                                 | XML-heavy; not ideal for modern web APIs  |
| **OpenID Connect**     | OAuth2 + ID layer; JSON/REST friendly                  | More components to configure              |

**Further Reading**: [OAuth 2.0 Simplified (Aaron Parecki)](https://aaronparecki.com/oauth-2-simplified/)

---

## 6. Load Balancing

Distribute client requests to improve **throughput**, **fault tolerance**, and **latency**. Consider Layer 4 vs. Layer 7 routing, session affinity, TLS termination, and health checks. Modern proxies add observability, retries, and circuit breakers for microservices.

| Technology            | Pros                                                         | Cons                                           |
|-----------------------|--------------------------------------------------------------|------------------------------------------------|
| **Nginx**             | High performance; versatile reverse proxy & LB               | Manual scaling; complex configs at scale       |
| **AWS ELB**           | Fully managed; integrates with AWS auto-scaling & ACM        | Less granular control                          |
| **HAProxy**           | Extreme throughput; advanced routing                        | Steep learning curve for complex rules         |
| **Envoy**             | Service-mesh ready; HTTP/2 & gRPC native support             | More components to operate & monitor           |

**Further Reading**: [What Is Load Balancing? (Cloudflare)](https://www.cloudflare.com/learning/load-balancing/)

---

## 7. Caching

Store frequent data close to clients to reduce latency and backend load. Decide cache location (client, edge/CDN, mid-tier, DB), eviction policy (LRU, TTL), and invalidation strategy. Watch for stampedes, coherence issues, and stale data.

| Technology           | Pros                                          | Cons                                           |
|----------------------|-----------------------------------------------|------------------------------------------------|
| **Redis**            | Rich data types; TTL; persistence options     | Memory-bound; clustering complexity            |
| **Memcached**        | Simple; ultra-fast key-value                  | No persistence; single data type               |
| **CDN (CloudFront)** | Edge caching for static/dynamic assets        | Limited for personalized content               |
| **In-Process**       | Instant access per instance                   | Not shared across nodes; coherence challenges  |

**Further Reading**: [Caching Strategies (Section.io)](https://www.section.io/engineering-education/caching-strategies/)

---

## 8. Message Queues

Decouple producers & consumers, smooth spikes, and enable asynchronous workflows. Pick delivery semantics (at-least-once vs. exactly-once), ordering guarantees, and retry/dead-letter handling. Proper queue choice and tuning underpin resiliency.

| Technology      | Pros                                                | Cons                                                    |
|-----------------|-----------------------------------------------------|---------------------------------------------------------|
| **Kafka**       | High throughput; durable log; retention policies    | Operationally complex; disk-heavy                       |
| **RabbitMQ**    | Flexible routing (exchanges, topics)                | Lower throughput vs. Kafka                              |
| **AWS SQS**     | Fully managed; virtually unlimited                  | Visibility timeout tuning; no streaming API             |
| **Google Pub/Sub** | Global scale; push/pull modes; at-least-once    | Costs can rise at extreme throughput                    |

**Further Reading**: [Introduction to Apache Kafka](https://kafka.apache.org/intro)

---

## 9. Indexing

Indexes pre-sort or hash data to speed queries. Understand B-Tree vs. Hash vs. inverted vs. bitmap indexes, and their impact on write amplification, storage, and query performance. Poor indexing can slow a system more than none.

| Technology          | Pros                                         | Cons                                                |
|---------------------|----------------------------------------------|-----------------------------------------------------|
| **B-Tree**          | Supports range queries; default in SQL DBs   | Slower writes under heavy load                      |
| **Hash**            | O(1) lookups for exact matches               | No range scans                                      |
| **Full-Text (ES)**  | Powerful text search & ranking               | Additional sync & cluster management                |
| **Bitmap**          | Efficient for low-cardinality columns        | Bloats on high-cardinality data                     |

**Further Reading**: [How Database Indexing Works (DigitalOcean)](https://www.digitalocean.com/community/tutorials/how-database-indexing-works)

---

## 10. Failover & High Availability

Design for minimal downtime with **redundancy** at every layer: compute, storage, network. Use health checks, automated failover, and clear runbooks. Know your system’s **RTO** (Recovery Time Objective) and **RPO** (Recovery Point Objective) to align strategies with SLAs.

| Strategy               | Pros                                                     | Cons                                                   |
|------------------------|----------------------------------------------------------|--------------------------------------------------------|
| **Active-Passive**     | Simple; standby takes over                               | Idle resources; failover latency                       |
| **Active-Active**      | Instant failover; full utilization                       | Split-brain risk; conflict resolution                  |
| **Multi-Region**       | Geographic redundancy; regional failover                 | High cost; complex cross-region sync                    |
| **DNS Failover**       | Easy to set up via health checks                         | DNS TTL delays; not instantaneous                      |

**Further Reading**: [High Availability Architectures (AWS)](https://aws.amazon.com/architecture/high-availability/)

---

## 11. Replication

Duplicate data to improve read throughput, fault tolerance, and disaster recovery. Choose **synchronous** (strong consistency; higher latency) or **asynchronous** (lower latency; risk of lag). Understand topologies: master-slave, multi-master, quorum.

| Strategy                | Pros                                         | Cons                                              |
|-------------------------|----------------------------------------------|---------------------------------------------------|
| **Master-Slave**        | Simple read scaling; easy to implement       | Slave lag; single write bottleneck                |
| **Master-Master**       | Distributed writes; no single hot spot       | Conflict resolution complexity                    |
| **Quorum (Cassandra)**  | Tunable consistency vs. latency              | Complex tuning; risk of uneven data distribution  |
| **Snapshot & Backup**   | Point-in-time recovery                       | Slower restores; storage overhead                 |

**Further Reading**: [Intro to Database Replication (DigitalOcean)](https://www.digitalocean.com/community/tutorials/an-introduction-to-database-replication)

---

## 12. Consistent Hashing

Consistent hashing distributes keys across nodes in a way that **minimizes data reshuffling** when nodes join/leave. Visualize a ring where both nodes and keys are hashed onto the same space; each key maps to the next node clockwise. When a node changes, only its neighbor range moves. **Virtual nodes** (vnodes) provide finer load distribution, and algorithms like **Jump Consistent Hash** offer speed and minimal metadata.

| Algorithm                | Pros                                         | Cons                                               |
|--------------------------|----------------------------------------------|----------------------------------------------------|
| **Modulo Hashing**       | Easy implementation                          | Huge reshuffling on node changes                  |
| **Ring-Based**           | Minimal key movement; good for dynamic clusters | Complex ring management                           |
| **Virtual Nodes**        | Even distribution with few nodes             | Additional metadata; mapping overhead              |
| **Jump Consistent Hash** | Fast; minimal memory footprint               | Less intuitive; slight implementation complexity   |

**Further Reading**: [Consistent Hashing (Wikipedia)](https://en.wikipedia.org/wiki/Consistent_hashing)

---

## Two-Week Study Plan Suggestion

1. **Days 1–3**: APIs & Data Modeling
2. **Days 4–6**: Scaling Strategies & CAP Theorem
3. **Days 7–9**: Auth, Load Balancing & Caching
4. **Days 10–11**: Queues & Indexing
5. **Days 12–13**: Failover, Replication & Consistent Hashing
6. **Day 14**: Full mock design exercise (e.g., rate limiter or URL shortener)

---
