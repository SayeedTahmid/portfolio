import { resume } from "../../sources.ts";
import type { Project } from "../../types.ts";

const project: Project = {
  slug: "flood-early-warning",
  title: "Smart flood early-warning system",
  summary:
    "A low-cost STM32 device that fuses water level, its rate of rise, humidity and soil moisture into a flood-risk index with three alert tiers.",
  category: "embedded",
  status: "completed",
  year: 2026,
  context:
    "Microprocessors and Interfacing lab (CSE331L), North South University",
  team: {
    kind: "team",
    size: 3,
    collaborators: ["Tanvir Bin Zahid", "Farhan Tajwar Robe"],
  },
  role: "Interrupt-driven firmware in bare-metal C.",
  highlights: [
    "A weighted risk index drives a SAFE / WARNING / EVACUATE state machine, with a hysteresis band to stop it flickering between tiers.",
    "Bare-metal C with the HAL disabled for direct register access: a 1 ms SysTick interrupt tracks the water's rate of rise while a 100 ms main loop updates an I2C OLED, an LED bank and a PWM buzzer.",
    "Needs no internet connection, so alerts don't depend on mobile networks during a flood.",
  ],
  metrics: [
    {
      label: "Bill of materials",
      value: "BDT 1,835",
      evaluation: "other",
      detail: "complete prototype, Dhaka electronics market prices",
      source: { label: "CSE331L project report (not public)" },
    },
  ],
  stack: [
    "C",
    "STM32F103C8T6",
    "ARM Cortex-M3",
    "STM32CubeIDE",
    "I2C",
    "ADC",
    "PWM",
  ],
  image: {
    src: "/projects/flood-early-warning/prototype.jpg",
    width: 1094,
    height: 1600,
    alt: "Photo of the prototype on a lab desk: an HC-SR04 ultrasonic sensor rests on the rim of a paper cup of water to measure its level, a soil-moisture probe is pushed into a potted plant, and a 4×4 membrane keypad and an ST-LINK V2 programmer are wired to the STM32 board on a breadboard.",
    caption:
      "The breadboard prototype under test: the HC-SR04 measures the water level in a paper cup, and the soil-moisture probe sits in a potted plant.",
    // A photo: on project cards it fills the frame instead of being letterboxed.
    fit: "cover",
  },
  availabilityNote: "The firmware and report are not public.",
  evidence: [resume, { label: "CSE331L project report (not public)" }],
};

export default project;
