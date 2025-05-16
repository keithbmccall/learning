# Guided Delivery Instructions – Interview Walkthrough

## 🎙️ 60–Second Spoken Summary (Cold Open)
> “I led the frontend and orchestration work for Walmart’s Guided Delivery Instructions project, targeting high delivery failure rates in apartments and gated communities. These failures were costing the company over $20M annually. My team built a reusable delivery instruction component, integrated across two applications, and coordinated with four teams to align on data contracts and orchestration flows. Post-launch, we saw a 50% reduction in ‘can’t access’ returns and estimated annual savings of over $4 million.”

---

## 🧠 Quick-Reference Cheat Sheet (For Interview Use)

### 🚨 Business Problem & Metrics
- $20.8M lost annually due to returns/missing orders
- 40% caused by unclear address and access issues → $8.32M
- Apartment/Gated returns: 2x higher than single homes
- Freeform text: confusing (esp. for Spanish-speaking drivers)
- Post-launch: cut 'can’t access' and 'can’t find' returns **in half**
- Estimated **$4.16M/year savings**

### 🎯 North Star Goal
- Improve delivery success for complex addresses
- Reduce return-related losses and improve driver experience

---

### 🛠️ Your Role
- Senior FE + Orchestration Lead (Checkout team)
- Led frontend architecture + shared component dev
- Main POC for cross-team coordination
- Collaborated with design, product, and InHome backend

### 🧑‍🤝‍🧑 Stakeholder Alignment
- 4 stakeholders/tenants, 2 apps shared component
- Checkout owned shared component build
- Drafted architecture doc → signed off by all consumers
- Used as live API contract throughout development
- Lat/long fallback call built **into component** (out-of-the-box support)

---

### 🧑‍🤝‍🧑 Stakeholder Alignment (in Full Detailed Write-Up)

**Product/Design Collaboration:**
- Early prototypes featured a dropdown menu attached to each address type, requiring users to select a drop-off location from a dropdown within each selection.
- I pushed back and recommended breaking this out into **standalone radio button groups** for drop-off locations.
  - **Reason 1**: Separation more closely aligned with how data was modeled and sent to the frontend — cleaner and more modular.
  - **Reason 2**: A dropdown nested inside another selector created **extra UX friction**, especially on mobile.
- Product cross teams agreed, and we implemented the radio-button layout.

---

### ⚙️ Technical Challenges & Decisions

#### 🧩 Shared Component
- Google Maps permissions differed across tenants → security isolation
- Needed to align on `deliveryInstructionDetails` shape

#### 🧪 Data + Orchestration Layer
- PatchDeliveryAddress: refactored fire-and-forget → response-consuming
- Added parallel call to InHome for default data
- Sequential fallback: Accounts → InHome → response to FE
- Tradeoff: latency vs completeness — went with async non-blocking

#### 📦 Backend Integrations
- Conditional orchestration call to InHome during contract creation
- Pulled additional lat/long from Address service if not present

---

### 📈 Results
- 'Can’t access' returns: **~20% → ~9%**
- 'Can’t find' returns: **~20% → ~10%**
- Driver feedback: much improved clarity
- Reusable component available for future delivery-related projects
- Annual cost savings: **~$4.16M** (estimate)

---

### 🔄 Reflection & Learnings

**What I Learned:**
- Learned how to coordinate across multiple teams — first time leading a project of this scale
- Gained exposure to different workflows and engineering practices across three other teams
- Valuable experience iterating on requirements and timelines with product/design

**What I’d Do Differently:**
- Identify upfront any **outstanding tech debt** from dependent teams  
  → e.g., simultaneous migration of `deliveryInstructionDetails` and feature work created risk

---

### 💬 Delivery Tips
- Lead with **business pain** + savings
- Emphasize **cross-team coordination** + ownership
- Be ready to whiteboard:  
  `address input → component → orchestration → backend`
- Clearly explain **trade-offs** (latency vs completeness, shared infra vs team autonomy)
- End with how it scaled or influenced platform design

---

## 📄 Full Detailed Write-Up

### 1. Context & Business Need

**Problem:**  
Delivery location ambiguity—especially in apartment complexes, gated communities, and business locations—was a leading cause of failed deliveries, high return rates, and customer dissatisfaction.

- 15–20% of returns stemmed from access issues in apartments/gated communities
- $20.8M lost annually due to delivery issues

**Hypothesis:**
- Address clarity issues → failed deliveries
- Freeform text not reliable (verbose, unclear, language barrier)

**Pre-launch Metrics:**
- 1.8% return rate; apartments 2x more than homes
- 20% of returns: “can’t access”
- 23% of missing orders: unclear delivery locations
- $4.9M cost from returns

---

### 2. My Role & Collaboration

**Role:** Sr Frontend Engineer & Checkout Tech Lead

- Led FE + orchestration layer work
- Coordinated with 4 engineering stakeholders
- Partnered with product & design on functional/presentation requirements

**Stakeholder Alignment:**
- Checkout team led shared component
- Created architecture doc signed off by all consumers (used as live API spec)
- Component included logic to query default lat/long (fully self-contained)

---

### 3. Technical Architecture & Tradeoffs

#### Backend:
- `createContract` → conditional call to InHome in parallel vs sequential
- Used async parallel calls on page load to maintain perf


#### Orchestration Layer:
- PatchDeliveryAddress: fire-and-forget → response-consumed
- Sequential call: Accounts → InHome


#### Frontend:
- Consumed orchestration response and display data to customer
- Integrated shared component into 2 apps
- Included lat/long fallback query if needed

---

### 4. Outcome & Results

- “Can’t access” returns: **~20% → ~9%**
- “Can’t find” returns: **~20% → ~10%**
- Positive feedback from drivers
- Conversion remained stable
- **$4.16M/year savings** (est.)
- Reused by InHome and other projects

---

### 5. Reflection

**Learned:**
- Multi-team coordination and alignment
- Product/design iteration
- Deeper understanding of shared component management

**Would Do Differently:**
- Identify tech debt blockers early (e.g., deliveryInstructionDetails migration)


