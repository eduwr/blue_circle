declare global {
  interface ImportMeta {
    main: boolean;
  }
}

export function add(a: number, b: number): number {
  return a + b;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
console.log(import.meta);
if (import.meta.main) {
  console.log("Add 2 + 3 =", add(2, 3));
}
