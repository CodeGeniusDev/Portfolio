let registered = false;
let loadingPromise: Promise<void> | null = null;

export type GSAP = typeof import("gsap/gsap-core")["default"];
export type ScrollTriggerType =
  | typeof import("gsap/ScrollTrigger")["default"]
  | undefined;

export let gsap: GSAP | undefined;
export let ScrollTrigger: ScrollTriggerType;

export async function registerGsap(): Promise<{
  gsap: GSAP;
  ScrollTrigger: NonNullable<ScrollTriggerType>;
} | void> {
  if (typeof window === "undefined") return;
  if (registered) return;

  if (!loadingPromise) {
    loadingPromise = Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([mgsap, mScrollTrigger]) => {
      const resolvedGsap = ((mgsap as any).default ?? mgsap) as GSAP;
      const resolvedScrollTrigger = (
        (mScrollTrigger as any).default ?? mScrollTrigger
      ) as NonNullable<ScrollTriggerType>;

      gsap = resolvedGsap;
      ScrollTrigger = resolvedScrollTrigger;
      resolvedGsap.registerPlugin(resolvedScrollTrigger);
      registered = true;
    });
  }

  await loadingPromise;
}