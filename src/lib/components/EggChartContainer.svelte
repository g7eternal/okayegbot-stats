<div class="clip">
  <svg width="0" height="0" class="visually-hidden">
    <defs>
      <clipPath id="svg_egg" clipPathUnits="objectBoundingBox">
        <path
          d="M 0.5 0.02
          C 0.6 0.02, 0.67 0.3, 0.67 0.5 
          C 0.67 0.72, 0.67 0.95, 0.5 0.95 
          C 0.33 0.95, 0.33 0.72, 0.33 0.5 
          C 0.33 0.3, 0.4 0.02, 0.5 0.02
          Z"
        />
      </clipPath>
    </defs>
  </svg>

  <slot />
</div>

<style>
  .clip {
    -webkit-clip-path: url(#svg_egg);
    clip-path: url(#svg_egg);
    max-width: 100%;
    aspect-ratio: 3;
  }
</style>
