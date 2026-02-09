// Logic Questions Database
const logicQuestions = [
  {
    id: 1,
    question: "What type of reasoning: All men are mortal, Socrates is a man, therefore Socrates is mortal?",
    options: ["Syllogism", "Induction", "Deduction", "Abduction"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "A syllogism is a logical argument with two premises and a conclusion."
  },
  {
    id: 2,
    question: "What is ¬(P ∧ Q) equivalent to?",
    options: ["¬P ∨ ¬Q", "¬P ∧ ¬Q", "P ∨ Q", "P ∧ Q"],
    correct: 0,
    subject: "logic",
    difficulty: 4,
    explanation: "De Morgan's Law: ¬(P ∧ Q) ≡ ¬P ∨ ¬Q"
  },
  {
    id: 3,
    question: "What fallacy: If P then Q, Q, therefore P?",
    options: ["Affirming", "Denying", "Circular", "False"],
    correct: 0,
    subject: "logic",
    difficulty: 4,
    explanation: "Affirming the consequent: (P→Q) ∧ Q does not imply P."
  },
  {
    id: 4,
    question: "What quantifier means 'for all'?",
    options: ["∀", "∃", "∄", "∈"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "∀ is the universal quantifier meaning 'for all' or 'for every'."
  },
  {
    id: 5,
    question: "What is a statement that is always true?",
    options: ["Tautology", "Contradiction", "Contingency", "Paradox"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "A tautology is a statement that is true in every possible interpretation."
  },
  {
    id: 6,
    question: "What is P → Q equivalent to?",
    options: ["¬P ∨ Q", "P ∧ ¬Q", "¬Q → ¬P", "Both"],
    correct: 0,
    subject: "logic",
    difficulty: 4,
    explanation: "Material implication: P → Q ≡ ¬P ∨ Q"
  },
  {
    id: 7,
    question: "What fallacy: If P then Q, not P, therefore not Q?",
    options: ["Denying", "Affirming", "Circular", "False"],
    correct: 0,
    subject: "logic",
    difficulty: 4,
    explanation: "Denying the antecedent: (P→Q) ∧ ¬P does not imply ¬Q."
  },
  {
    id: 8,
    question: "What logic uses 0 and 1 only?",
    options: ["Boolean", "Fuzzy", "Modal", "Temporal"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "Boolean logic uses binary values (0/1, false/true)."
  },
  {
    id: 9,
    question: "What is the principle: P ∨ ¬P?",
    options: ["Excluded", "Noncontradiction", "Identity", "Sufficient"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "Law of excluded middle: P ∨ ¬P is always true."
  },
  {
    id: 10,
    question: "What type of proof assumes opposite?",
    options: ["Contradiction", "Induction", "Direct", "Construction"],
    correct: 0,
    subject: "logic",
    difficulty: 4,
    explanation: "Proof by contradiction: assume opposite, show contradiction."
  },
  {
    id: 11,
    question: "What quantifier means 'there exists'?",
    options: ["∃", "∀", "∄", "∉"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "∃ is the existential quantifier meaning 'there exists'."
  },
  {
    id: 12,
    question: "What is ¬∀x P(x) equivalent to?",
    options: ["∃x ¬P(x)", "∀x ¬P(x)", "¬∃x P(x)", "∃x P(x)"],
    correct: 0,
    subject: "logic",
    difficulty: 4,
    explanation: "Quantifier negation: ¬∀x P(x) ≡ ∃x ¬P(x)"
  },
  {
    id: 13,
    question: "What fallacy: This must be true because many believe it?",
    options: ["Popularity", "Authority", "Tradition", "Emotion"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "Appeal to popularity: something is true because many believe it."
  },
  {
    id: 14,
    question: "What logic deals with possibility?",
    options: ["Modal", "Temporal", "Deontic", "Epistemic"],
    correct: 0,
    subject: "logic",
    difficulty: 4,
    explanation: "Modal logic deals with necessity and possibility (□ and ◇ operators)."
  },
  {
    id: 15,
    question: "What is the principle: ¬(P ∧ ¬P)?",
    options: ["Noncontradiction", "Excluded", "Identity", "Bivalence"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "Law of noncontradiction: ¬(P ∧ ¬P) is always true."
  },
  {
    id: 16,
    question: "What type of reasoning from specific to general?",
    options: ["Induction", "Deduction", "Abduction", "Reduction"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "Inductive reasoning: from specific observations to general conclusions."
  },
  {
    id: 17,
    question: "What is P ↔ Q equivalent to?",
    options: ["(P→Q)∧(Q→P)", "P∨Q", "P∧Q", "¬P∨¬Q"],
    correct: 0,
    subject: "logic",
    difficulty: 4,
    explanation: "Biconditional: P ↔ Q ≡ (P→Q) ∧ (Q→P)"
  },
  {
    id: 18,
    question: "What fallacy attacks person not argument?",
    options: ["Ad", "Strawman", "Slippery", "False"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "Ad hominem: attacking the person instead of the argument."
  },
  {
    id: 19,
    question: "What logic deals with time?",
    options: ["Temporal", "Modal", "Deontic", "Epistemic"],
    correct: 0,
    subject: "logic",
    difficulty: 4,
    explanation: "Temporal logic deals with time-related concepts (eventually, always, until)."
  },
  {
    id: 20,
    question: "What is a statement always false?",
    options: ["Contradiction", "Tautology", "Contingency", "Paradox"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "A contradiction is a statement that is false in every possible interpretation."
  },
  {
    id: 21,
    question: "What type of proof: P→Q, Q→R, therefore P→R?",
    options: ["Transitivity", "Symmetry", "Reflexivity", "Distributivity"],
    correct: 0,
    subject: "logic",
    difficulty: 4,
    explanation: "Transitivity of implication: if P→Q and Q→R, then P→R."
  },
  {
    id: 22,
    question: "What is ∃!x P(x) meaning?",
    options: ["Unique", "Exists", "Forall", "Not"],
    correct: 0,
    subject: "logic",
    difficulty: 4,
    explanation: "∃! means 'there exists a unique' (exactly one)."
  },
  {
    id: 23,
    question: "What fallacy: X is true because expert says so?",
    options: ["Authority", "Popularity", "Tradition", "Emotion"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "Appeal to authority: something is true because an authority says so."
  },
  {
    id: 24,
    question: "What logic deals with knowledge?",
    options: ["Epistemic", "Deontic", "Modal", "Temporal"],
    correct: 0,
    subject: "logic",
    difficulty: 4,
    explanation: "Epistemic logic deals with knowledge and belief."
  },
  {
    id: 25,
    question: "What is ¬∃x P(x) equivalent to?",
    options: ["∀x ¬P(x)", "∃x ¬P(x)", "¬∀x P(x)", "∃x P(x)"],
    correct: 0,
    subject: "logic",
    difficulty: 4,
    explanation: "Quantifier negation: ¬∃x P(x) ≡ ∀x ¬P(x)"
  },
  {
    id: 26,
    question: "What fallacy: If we allow A, then Z will happen?",
    options: ["Slippery", "Strawman", "False", "Circular"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "Slippery slope: if we allow A, then Z (extreme consequence) will happen."
  },
  {
    id: 27,
    question: "What type of reasoning to best explanation?",
    options: ["Abduction", "Deduction", "Induction", "Reduction"],
    correct: 0,
    subject: "logic",
    difficulty: 4,
    explanation: "Abductive reasoning: inference to the best explanation."
  },
  {
    id: 28,
    question: "What is P ∧ (Q ∨ R) equivalent to?",
    options: ["(P∧Q)∨(P∧R)", "P∨(Q∧R)", "(P∨Q)∧(P∨R)", "P∧Q∧R"],
    correct: 0,
    subject: "logic",
    difficulty: 4,
    explanation: "Distributive law: P ∧ (Q ∨ R) ≡ (P ∧ Q) ∨ (P ∧ R)"
  },
  {
    id: 29,
    question: "What fallacy misrepresents opponent's argument?",
    options: ["Strawman", "Ad", "Slippery", "False"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "Straw man fallacy: misrepresenting opponent's argument to make it easier to attack."
  },
  {
    id: 30,
    question: "What logic deals with obligation?",
    options: ["Deontic", "Epistemic", "Modal", "Temporal"],
    correct: 0,
    subject: "logic",
    difficulty: 4,
    explanation: "Deontic logic deals with obligation, permission, and related concepts."
  },
  {
    id: 31,
    question: "What is the principle: If P, then P?",
    options: ["Identity", "Excluded", "Noncontradiction", "Sufficient"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "Law of identity: P → P (if P is true, then P is true)."
  },
  {
    id: 32,
    question: "What fallacy uses circular reasoning?",
    options: ["Begging", "False", "Slippery", "Strawman"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "Begging the question (circular reasoning): using the conclusion as a premise."
  },
  {
    id: 33,
    question: "What is P ∨ (Q ∧ R) equivalent to?",
    options: ["(P∨Q)∧(P∨R)", "P∧(Q∨R)", "(P∧Q)∨(P∧R)", "P∨Q∨R"],
    correct: 0,
    subject: "logic",
    difficulty: 4,
    explanation: "Distributive law: P ∨ (Q ∧ R) ≡ (P ∨ Q) ∧ (P ∨ R)"
  },
  {
    id: 34,
    question: "What fallacy assumes what needs proving?",
    options: ["Petitio", "Complex", "Loaded", "Rhetorical"],
    correct: 0,
    subject: "logic",
    difficulty: 4,
    explanation: "Petitio principii (begging the question): assuming what needs to be proved."
  },
  {
    id: 35,
    question: "What is a conditional statement?",
    options: ["If-then", "And", "Or", "Not"],
    correct: 0,
    subject: "logic",
    difficulty: 2,
    explanation: "Conditional: if P then Q (P → Q)."
  },
  {
    id: 36,
    question: "What fallacy presents only two alternatives?",
    options: ["False", "Complex", "Loaded", "Strawman"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "False dilemma/dichotomy: presenting only two alternatives when more exist."
  },
  {
    id: 37,
    question: "What is proof by cases?",
    options: ["Exhaustion", "Contradiction", "Induction", "Construction"],
    correct: 0,
    subject: "logic",
    difficulty: 4,
    explanation: "Proof by exhaustion/cases: proving by examining all possible cases."
  },
  {
    id: 38,
    question: "What fallacy uses irrelevant emotional appeal?",
    options: ["Emotion", "Popularity", "Tradition", "Authority"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "Appeal to emotion: using emotional manipulation instead of valid reasoning."
  },
  {
    id: 39,
    question: "What is contrapositive of P→Q?",
    options: ["¬Q→¬P", "Q→P", "¬P→¬Q", "P→¬Q"],
    correct: 0,
    subject: "logic",
    difficulty: 4,
    explanation: "Contrapositive: P→Q is equivalent to ¬Q→¬P."
  },
  {
    id: 40,
    question: "What fallacy: Since event followed another, caused it?",
    options: ["Post", "False", "Slippery", "Strawman"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "Post hoc ergo propter hoc: since A followed B, A caused B."
  },
  {
    id: 41,
    question: "What is logical conjunction?",
    options: ["And", "Or", "Not", "If"],
    correct: 0,
    subject: "logic",
    difficulty: 2,
    explanation: "Conjunction: P ∧ Q (P and Q)."
  },
  {
    id: 42,
    question: "What fallacy: Because tradition, therefore true?",
    options: ["Tradition", "Authority", "Popularity", "Emotion"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "Appeal to tradition: something is true because it's traditional."
  },
  {
    id: 43,
    question: "What is logical disjunction?",
    options: ["Or", "And", "Not", "If"],
    correct: 0,
    subject: "logic",
    difficulty: 2,
    explanation: "Disjunction: P ∨ Q (P or Q)."
  },
  {
    id: 44,
    question: "What fallacy assumes shared characteristic implies all?",
    options: ["Hasty", "Sweeping", "False", "Loaded"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "Hasty generalization: small sample → general conclusion."
  },
  {
    id: 45,
    question: "What is logical negation?",
    options: ["Not", "And", "Or", "If"],
    correct: 0,
    subject: "logic",
    difficulty: 2,
    explanation: "Negation: ¬P (not P)."
  },
  {
    id: 46,
    question: "What fallacy: Attack exaggerated version?",
    options: ["Strawman", "Ad", "Slippery", "False"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "Straw man: attack exaggerated version of argument."
  },
  {
    id: 47,
    question: "What is proof by induction?",
    options: ["Mathematical", "Logical", "Direct", "Contradiction"],
    correct: 0,
    subject: "logic",
    difficulty: 4,
    explanation: "Mathematical induction: prove base case, then if P(n) then P(n+1)."
  },
  {
    id: 48,
    question: "What fallacy: Assuming part represents whole?",
    options: ["Composition", "Division", "False", "Hasty"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "Fallacy of composition: assuming what's true of part is true of whole."
  },
  {
    id: 49,
    question: "What is a biconditional?",
    options: ["If-and-only-if", "If-then", "And", "Or"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "Biconditional: P ↔ Q (P if and only if Q)."
  },
  {
    id: 50,
    question: "What fallacy: Assuming whole represents part?",
    options: ["Division", "Composition", "False", "Hasty"],
    correct: 0,
    subject: "logic",
    difficulty: 3,
    explanation: "Fallacy of division: assuming what's true of whole is true of parts."
  }
];
