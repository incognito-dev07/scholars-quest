// Physics Questions Database
const physicsQuestions = [
  {
    id: 1,
    question: "What is the SI unit of electric charge?",
    options: ["Coulomb", "Ampere", "Volt", "Ohm"],
    correct: 0,
    subject: "physics",
    difficulty: 2,
    explanation: "The coulomb (C) is the SI unit of electric charge."
  },
  {
    id: 2,
    question: "What particle carries the electromagnetic force?",
    options: ["Photon", "Gluon", "Boson", "Electron"],
    correct: 0,
    subject: "physics",
    difficulty: 4,
    explanation: "Photons are the gauge bosons that mediate the electromagnetic force."
  },
  {
    id: 3,
    question: "What is the speed of sound in air at 20°C?",
    options: ["343m/s", "330m/s", "300m/s", "365m/s"],
    correct: 0,
    subject: "physics",
    difficulty: 3,
    explanation: "Speed of sound in dry air at 20°C is approximately 343 m/s."
  },
  {
    id: 4,
    question: "What law states PV = nRT?",
    options: ["Ideal", "Boyle's", "Charles's", "Gay-Lussac's"],
    correct: 0,
    subject: "physics",
    difficulty: 3,
    explanation: "PV = nRT is the Ideal Gas Law, combining Boyle's, Charles's, and Avogadro's laws."
  },
  {
    id: 5,
    question: "What is the antiparticle of an electron?",
    options: ["Positron", "Proton", "Neutron", "Antineutrino"],
    correct: 0,
    subject: "physics",
    difficulty: 4,
    explanation: "The positron is the antiparticle of the electron, with positive charge."
  },
  {
    id: 6,
    question: "What is Planck's constant approximately?",
    options: ["6.63×10⁻³⁴", "1.05×10⁻³⁴", "3.00×10⁸", "9.81"],
    correct: 0,
    subject: "physics",
    difficulty: 4,
    explanation: "Planck's constant h ≈ 6.626×10⁻³⁴ J·s"
  },
  {
    id: 7,
    question: "What type of lens converges light?",
    options: ["Convex", "Concave", "Plano", "Diverging"],
    correct: 0,
    subject: "physics",
    difficulty: 2,
    explanation: "Convex lenses converge parallel light rays to a focal point."
  },
  {
    id: 8,
    question: "What is the unit of magnetic flux?",
    options: ["Weber", "Tesla", "Henry", "Farad"],
    correct: 0,
    subject: "physics",
    difficulty: 3,
    explanation: "The weber (Wb) is the SI unit of magnetic flux."
  },
  {
    id: 9,
    question: "What principle explains why ice floats?",
    options: ["Archimedes'", "Pascal's", "Bernoulli's", "Hooke's"],
    correct: 0,
    subject: "physics",
    difficulty: 2,
    explanation: "Archimedes' principle: buoyant force equals weight of displaced fluid."
  },
  {
    id: 10,
    question: "What is the rest mass of a photon?",
    options: ["Zero", "9.11×10⁻³¹", "1.67×10⁻²⁷", "1.78×10⁻³⁶"],
    correct: 0,
    subject: "physics",
    difficulty: 4,
    explanation: "Photons are massless particles that travel at light speed."
  },
  {
    id: 11,
    question: "What law is F = -kx?",
    options: ["Hooke's", "Newton's", "Ohm's", "Coulomb's"],
    correct: 0,
    subject: "physics",
    difficulty: 2,
    explanation: "F = -kx is Hooke's Law for spring force, where k is spring constant."
  },
  {
    id: 12,
    question: "What particle mediates the strong force?",
    options: ["Gluon", "Photon", "W-boson", "Z-boson"],
    correct: 0,
    subject: "physics",
    difficulty: 5,
    explanation: "Gluons mediate the strong nuclear force between quarks."
  },
  {
    id: 13,
    question: "What is the SI unit of capacitance?",
    options: ["Farad", "Henry", "Ohm", "Siemens"],
    correct: 0,
    subject: "physics",
    difficulty: 3,
    explanation: "The farad (F) is the SI unit of capacitance."
  },
  {
    id: 14,
    question: "What is the time constant in RC circuits?",
    options: ["RC", "R/C", "1/RC", "C/R"],
    correct: 0,
    subject: "physics",
    difficulty: 4,
    explanation: "Time constant τ = RC in resistor-capacitor circuits."
  },
  {
    id: 15,
    question: "What type of wave is sound?",
    options: ["Longitudinal", "Transverse", "Electromagnetic", "Standing"],
    correct: 0,
    subject: "physics",
    difficulty: 2,
    explanation: "Sound waves are longitudinal waves (particles oscillate parallel to direction)."
  },
  {
    id: 16,
    question: "What is the ground state electron configuration of hydrogen?",
    options: ["1s¹", "1s²", "2s¹", "1p¹"],
    correct: 0,
    subject: "physics",
    difficulty: 4,
    explanation: "Hydrogen has one electron in the 1s orbital: 1s¹"
  },
  {
    id: 17,
    question: "What is the unit of radioactivity?",
    options: ["Becquerel", "Curie", "Gray", "Sievert"],
    correct: 0,
    subject: "physics",
    difficulty: 3,
    explanation: "The becquerel (Bq) is the SI unit of radioactivity (decays per second)."
  },
  {
    id: 18,
    question: "What principle prevents two fermions from having identical quantum states?",
    options: ["Pauli", "Heisenberg", "Planck", "Einstein"],
    correct: 0,
    subject: "physics",
    difficulty: 5,
    explanation: "Pauli exclusion principle: no two fermions can occupy identical quantum states."
  },
  {
    id: 19,
    question: "What is the critical angle for total internal reflection?",
    options: ["arcsin(n₂/n₁)", "arccos(n₁/n₂)", "arctan(n₂/n₁)", "sin⁻¹(n₁/n₂)"],
    correct: 0,
    subject: "physics",
    difficulty: 4,
    explanation: "θ_c = arcsin(n₂/n₁), where n₁ > n₂"
  },
  {
    id: 20,
    question: "What is the SI unit of inductance?",
    options: ["Henry", "Farad", "Tesla", "Weber"],
    correct: 0,
    subject: "physics",
    difficulty: 4,
    explanation: "The henry (H) is the SI unit of inductance."
  },
  {
    id: 21,
    question: "What is the photoelectric effect threshold?",
    options: ["Work", "Energy", "Voltage", "Current"],
    correct: 0,
    subject: "physics",
    difficulty: 4,
    explanation: "Work function is the minimum energy needed to eject electrons in photoelectric effect."
  },
  {
    id: 22,
    question: "What is the law V = IR?",
    options: ["Ohm's", "Joule's", "Kirchhoff's", "Faraday's"],
    correct: 0,
    subject: "physics",
    difficulty: 2,
    explanation: "V = IR is Ohm's Law for electric circuits."
  },
  {
    id: 23,
    question: "What is the SI unit of luminous intensity?",
    options: ["Candela", "Lumen", "Lux", "Steradian"],
    correct: 0,
    subject: "physics",
    difficulty: 3,
    explanation: "The candela (cd) is the SI unit of luminous intensity."
  },
  {
    id: 24,
    question: "What is the time dilation factor in relativity?",
    options: ["γ", "β", "α", "λ"],
    correct: 0,
    subject: "physics",
    difficulty: 5,
    explanation: "γ = 1/√(1-v²/c²) is the Lorentz factor for time dilation."
  },
  {
    id: 25,
    question: "What is the unit of electric field strength?",
    options: ["N/C", "V/m", "J/C", "Both"],
    correct: 0,
    subject: "physics",
    difficulty: 3,
    explanation: "Electric field E = F/q has units N/C or equivalently V/m."
  },
  {
    id: 26,
    question: "What particle is emitted in beta decay?",
    options: ["Electron", "Proton", "Neutron", "Alpha"],
    correct: 0,
    subject: "physics",
    difficulty: 4,
    explanation: "Beta decay emits electrons (β⁻) or positrons (β⁺)."
  },
  {
    id: 27,
    question: "What is the unit of power?",
    options: ["Watt", "Joule", "Newton", "Pascal"],
    correct: 0,
    subject: "physics",
    difficulty: 1,
    explanation: "The watt (W) is the SI unit of power (J/s)."
  },
  {
    id: 28,
    question: "What is the uncertainty principle about?",
    options: ["ΔxΔp≥ħ/2", "ΔEΔt≥ħ/2", "Both", "Neither"],
    correct: 0,
    subject: "physics",
    difficulty: 5,
    explanation: "Heisenberg's uncertainty principle: ΔxΔp ≥ ħ/2 (position-momentum)."
  },
  {
    id: 29,
    question: "What is the speed of light in vacuum?",
    options: ["c", "3×10⁸", "299792458", "All"],
    correct: 0,
    subject: "physics",
    difficulty: 2,
    explanation: "c = 299,792,458 m/s ≈ 3×10⁸ m/s is the speed of light in vacuum."
  },
  {
    id: 30,
    question: "What is the unit of frequency?",
    options: ["Hertz", "Second", "Radian", "Cycle"],
    correct: 0,
    subject: "physics",
    difficulty: 1,
    explanation: "The hertz (Hz) is the SI unit of frequency (cycles per second)."
  },
  {
    id: 31,
    question: "What is Newton's first law about?",
    options: ["Inertia", "F=ma", "Action-reaction", "Momentum"],
    correct: 0,
    subject: "physics",
    difficulty: 2,
    explanation: "Newton's First Law (law of inertia): object remains at rest/uniform motion unless acted upon."
  },
  {
    id: 32,
    question: "What is the unit of magnetic field?",
    options: ["Tesla", "Weber", "Henry", "Gauss"],
    correct: 0,
    subject: "physics",
    difficulty: 3,
    explanation: "The tesla (T) is the SI unit of magnetic flux density."
  },
  {
    id: 33,
    question: "What is the ideal gas constant R?",
    options: ["8.314", "0.0821", "1.987", "All"],
    correct: 0,
    subject: "physics",
    difficulty: 3,
    explanation: "R ≈ 8.314 J/(mol·K) = 0.0821 L·atm/(mol·K) = 1.987 cal/(mol·K)"
  },
  {
    id: 34,
    question: "What is the Compton wavelength?",
    options: ["h/mc", "h/mv", "λ=h/p", "c/f"],
    correct: 0,
    subject: "physics",
    difficulty: 5,
    explanation: "Compton wavelength λ_c = h/(m·c) for particle scattering."
  },
  {
    id: 35,
    question: "What is the unit of angular momentum?",
    options: ["kg·m²/s", "N·m", "J·s", "Both"],
    correct: 0,
    subject: "physics",
    difficulty: 3,
    explanation: "Angular momentum L = Iω has units kg·m²/s or J·s."
  },
  {
    id: 36,
    question: "What is the principle of superposition?",
    options: ["Waves", "Forces", "Fields", "All"],
    correct: 0,
    subject: "physics",
    difficulty: 3,
    explanation: "Superposition: net effect is sum of individual effects (waves, forces, fields)."
  },
  {
    id: 37,
    question: "What is the Rydberg constant?",
    options: ["1.097×10⁷", "6.626×10⁻³⁴", "9.109×10⁻³¹", "1.673×10⁻²⁷"],
    correct: 0,
    subject: "physics",
    difficulty: 4,
    explanation: "Rydberg constant R∞ ≈ 1.097×10⁷ m⁻¹ for hydrogen spectral lines."
  },
  {
    id: 38,
    question: "What is the unit of electric potential?",
    options: ["Volt", "Joule", "Coulomb", "Ohm"],
    correct: 0,
    subject: "physics",
    difficulty: 2,
    explanation: "The volt (V) is the SI unit of electric potential (J/C)."
  },
  {
    id: 39,
    question: "What is the de Broglie wavelength?",
    options: ["λ=h/p", "λ=c/f", "λ=hc/E", "λ=2L/n"],
    correct: 0,
    subject: "physics",
    difficulty: 5,
    explanation: "de Broglie wavelength λ = h/p for matter waves."
  },
  {
    id: 40,
    question: "What is the Stefan-Boltzmann constant?",
    options: ["5.67×10⁻⁸", "1.38×10⁻²³", "6.67×10⁻¹¹", "8.99×10⁹"],
    correct: 0,
    subject: "physics",
    difficulty: 4,
    explanation: "Stefan-Boltzmann constant σ ≈ 5.67×10⁻⁸ W/(m²·K⁴) for blackbody radiation."
  },
  {
    id: 41,
    question: "What is the unit of pressure?",
    options: ["Pascal", "Newton", "Joule", "Watt"],
    correct: 0,
    subject: "physics",
    difficulty: 2,
    explanation: "The pascal (Pa) is the SI unit of pressure (N/m²)."
  },
  {
    id: 42,
    question: "What is the fine structure constant?",
    options: ["1/137", "π", "e", "√2"],
    correct: 0,
    subject: "physics",
    difficulty: 5,
    explanation: "Fine-structure constant α ≈ 1/137 characterizes electromagnetic interaction strength."
  },
  {
    id: 43,
    question: "What is the unit of heat capacity?",
    options: ["J/K", "J·K", "K/J", "J/(kg·K)"],
    correct: 0,
    subject: "physics",
    difficulty: 3,
    explanation: "Heat capacity has units J/K (specific heat: J/(kg·K))."
  },
  {
    id: 44,
    question: "What is the principle of equivalence?",
    options: ["Gravity", "Inertia", "Relativity", "Uncertainty"],
    correct: 0,
    subject: "physics",
    difficulty: 5,
    explanation: "Equivalence principle: gravitational mass = inertial mass (general relativity foundation)."
  },
  {
    id: 45,
    question: "What is the unit of activity (radioactive)?",
    options: ["Bq", "Gy", "Sv", "Ci"],
    correct: 0,
    subject: "physics",
    difficulty: 3,
    explanation: "Becquerel (Bq) = 1 decay/s; Curie (Ci) = 3.7×10¹⁰ Bq."
  },
  {
    id: 46,
    question: "What is the Wien displacement constant?",
    options: ["2.898×10⁻³", "5.67×10⁻⁸", "6.626×10⁻³⁴", "1.381×10⁻²³"],
    correct: 0,
    subject: "physics",
    difficulty: 4,
    explanation: "Wien's displacement constant b ≈ 2.898×10⁻³ m·K for blackbody radiation peak."
  },
  {
    id: 47,
    question: "What is the unit of torque?",
    options: ["N·m", "J", "W", "Pa"],
    correct: 0,
    subject: "physics",
    difficulty: 2,
    explanation: "Torque τ = r × F has units N·m (same as energy but different meaning)."
  },
  {
    id: 48,
    question: "What is the Boltzmann constant?",
    options: ["1.38×10⁻²³", "6.022×10²³", "1.602×10⁻¹⁹", "8.314"],
    correct: 0,
    subject: "physics",
    difficulty: 4,
    explanation: "Boltzmann constant k_B ≈ 1.381×10⁻²³ J/K relates energy to temperature."
  },
  {
    id: 49,
    question: "What is the unit of electrical conductivity?",
    options: ["Siemens", "Ohm", "Mho", "Both"],
    correct: 0,
    subject: "physics",
    difficulty: 3,
    explanation: "Siemens (S) = 1/Ω = mho, unit of electrical conductance."
  },
  {
    id: 50,
    question: "What is the Avogadro number?",
    options: ["6.022×10²³", "1.381×10⁻²³", "1.602×10⁻¹⁹", "9.109×10⁻³¹"],
    correct: 0,
    subject: "physics",
    difficulty: 3,
    explanation: "Avogadro's number N_A ≈ 6.022×10²³ mol⁻¹, particles per mole."
  }
];
