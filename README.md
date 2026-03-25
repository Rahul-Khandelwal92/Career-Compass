# Career Compass 🧭

**Navigating Career Transitions with Confidence**

Career Compass is a mobile-first web application designed to act as a personalized GPS for professionals pivoting into new roles. By mapping a user's current role to their target destination, the app identifies skill gaps, highlights transferable skills, and generates a step-by-step, actionable learning curriculum.

---

## 🎯 Problem Statement

The modern career path is rarely linear. Professionals looking to pivot into new roles (e.g., from Marketing to Product Management) often face significant hurdles:
1. **Information Overload:** The internet is flooded with roadmaps, courses, and advice, making it difficult to know where to start.
2. **The "Experience Paradox":** Pivoters often feel they are starting from scratch, failing to recognize how their existing skills transfer to the new role.
3. **Lack of Structure:** Without a clear, sequential plan, motivation drops and the transition process stalls.

## 💡 The Solution

Career Compass solves this by providing a focused, personalized, and highly structured transition experience.

### Core Features:
* **Career Coordinates (Home):** Users define their starting point (Current Role), destination (Target Role), and experience level.
* **Skill Gap Analysis (Progress):** A frictionless self-assessment tool that evaluates core competencies required for the target role while explicitly highlighting *Transferable Skills* to boost user confidence.
* **Personalized Curriculum (Learn):** A step-by-step roadmap broken down into manageable phases (e.g., "Product Sense," "Technical Foundations").
* **Actionable Resources:** Each step provides curated resources, estimated effort (e.g., "2 weeks"), and practical templates to apply learnings immediately.

---

## 🧠 Product & Design Choices

As a Product Manager, every feature and design decision was made with the user's psychological state and cognitive load in mind.

### 1. Emphasizing "Transferable Skills"
* **The "Why":** Career pivoters often suffer from imposter syndrome.
* **The Execution:** By explicitly tagging skills like "Stakeholder Management" or "User Research" as *Transferable* during the assessment phase, the app reduces the perceived gap between their current state and their goal. This serves as a psychological anchor, increasing motivation and retention.

### 2. Multiple UI Layouts for the Learning Path
* **The "Why":** Different users process complex information differently. Some need to see the big picture, while others get overwhelmed and need to focus on one step at a time.
* **The Execution:** I designed three distinct views for the curriculum:
  * **Classic Timeline:** For users who prefer a standard, detailed list.
  * **Subway Map:** For visual learners who want to see the interconnected journey.
  * **Focus Cards:** For users easily overwhelmed by long lists, showing only one major step per card to reduce cognitive load.

### 3. Mobile-First, Tab-Based Navigation
* **The "Why":** Career transitioning is often done "on the side" (during commutes, lunch breaks, or evenings).
* **The Execution:** A persistent bottom navigation bar (Home, Progress, Learn, Profile) allows for quick, one-handed check-ins. The architecture ensures users are never more than one tap away from their core learning path.

### 4. Color Psychology & Theming
* **The "Why":** The app needs to feel professional yet encouraging.
* **The Execution:** The primary brand color was intentionally chosen as **Teal (`#0f766e`)**. Teal represents clarity, growth, and calm; ideal for users navigating the stressful process of a career change. The app also supports Dark Mode and a Minimalist theme to cater to user reading preferences and reduce eye strain during late-night study sessions.

---

## 📸 Screenshots

*Coming soon*

---

## ⚖️ Tradeoffs & Design Decisions

| Decision | What I chose | What I gave up | Why |
|----------|-------------|----------------|-----|
| **3 curriculum views over a single layout** | Timeline, Subway Map, and Focus Cards | Simpler single-view UI | Different users process complex information differently; one layout excludes visual learners or overwhelmed users |
| **Transferable skills highlight over pure gap analysis** | Explicitly tagging existing strengths | Leaner, faster assessment | Imposter syndrome is a real dropout trigger; surfacing what users already know increases motivation to continue |
| **Static curated resources over AI-fetched content** | Hand-picked, reliable learning links | Always up-to-date dynamic content | For an MVP, quality and reliability matter more than recency; AI curation is planned for the next iteration |
| **Bottom tab navigation over hamburger menu** | Persistent 4-tab nav bar | More screen real estate | Users check in during short breaks; every extra tap to reach core content risks them dropping off |
| **Teal brand colour over neutral palette** | Warm, growth-oriented teal | Safe, corporate grey-blue | Colour psychology matters in an anxiety-inducing context; teal signals calm and forward momentum |

---

## 💡 What I Learned

- **The emotional state of the user is the product.** Career pivoters arrive anxious and doubtful. Every design decision was evaluated against one question: does this increase or reduce their confidence?
- **Transferable skills are undervalued by users, not by employers.** Making them visible early is not a UX nicety; it is the core retention mechanism.
- **Three views for the same data sounds like over-engineering, but it is not.** The diversity of how people process structured information made multiple layouts a genuine usability requirement, not a feature for its own sake.

---

## 🚀 Future Roadmap (Next Iterations)

To evolve this MVP into a comprehensive career platform, the following features are prioritized for the next development cycles:
1. **AI-Driven Resource Curation:** Dynamically fetching the most up-to-date articles, courses, and books based on the specific skill gap.
2. **Mentorship Matching:** Connecting users with professionals who have successfully made the exact same transition (e.g., matching a former QA Engineer with a current PM who used to be in QA).
3. **Progress Analytics:** Visualizing time spent on steps and providing gamified milestones to maintain long-term engagement.

---

## 🛠 Tech Stack

* **Frontend:** React 18, TypeScript, Vite
* **Styling:** Tailwind CSS (Utility-first, responsive design)
* **Icons:** Lucide React
* **Architecture:** Component-driven, mobile-first layout with global theme management.
