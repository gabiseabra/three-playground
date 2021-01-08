export const compose = (...shaders) =>
  function (...args) {
    const ctx = this
    shaders.forEach((fn) => fn.apply(ctx, args))
  }
