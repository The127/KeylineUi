<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push({ name: 'home' })
}

function goBack() {
  if (window.history.length > 1) router.back()
  else goHome()
}
</script>

<template>
  <div class="flex flex-col items-center gap-6 py-2 text-center">
    <div class="scene relative flex h-28 w-60 items-center justify-center">
      <svg class="keyhole absolute right-2 h-24 w-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" class="fill-slate-200 stroke-slate-700" stroke-width="3"/>
        <circle cx="50" cy="42" r="10" class="fill-slate-700"/>
        <path d="M45 42 L41 74 L59 74 L55 42 Z" class="fill-slate-700"/>
      </svg>

      <svg class="key absolute left-2 h-10 w-28" viewBox="0 0 112 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="20" r="13" class="fill-amber-400 stroke-amber-600" stroke-width="2"/>
        <circle cx="16" cy="20" r="5" class="fill-slate-50"/>
        <rect x="29" y="17" width="62" height="6" class="fill-amber-400 stroke-amber-600" stroke-width="2"/>
        <rect x="74" y="23" width="5" height="8" class="fill-amber-400 stroke-amber-600" stroke-width="2"/>
        <rect x="84" y="23" width="5" height="6" class="fill-amber-400 stroke-amber-600" stroke-width="2"/>
      </svg>

      <span class="spark absolute top-6 right-20 text-xl">✦</span>
    </div>

    <h1 class="text-6xl font-bold tracking-tight text-slate-800">
      4<span class="text-emerald-600">0</span>4
    </h1>

    <div class="flex max-w-sm flex-col gap-2">
      <p class="text-lg font-semibold text-slate-800">This key doesn't fit.</p>
      <p class="text-sm text-slate-500">
        The page you're trying to open has been locked away, moved, or never forged in the first place.
      </p>
    </div>

    <div class="mt-1 flex flex-col gap-3 sm:flex-row">
      <button
        class="cursor-pointer rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        @click="goHome"
      >
        Take me home
      </button>
      <button
        class="cursor-pointer rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        @click="goBack"
      >
        Go back
      </button>
    </div>

    <p class="font-mono text-xs text-slate-400 italic">
      keyring checked · no match found
    </p>
  </div>
</template>

<style scoped>
.key {
  transform-origin: 14px 20px;
  animation: wiggle 2.4s ease-in-out infinite;
}

@keyframes wiggle {
  0%, 100% { transform: translateX(0) rotate(0deg); }
  15% { transform: translateX(10px) rotate(0deg); }
  25% { transform: translateX(10px) rotate(-9deg); }
  35% { transform: translateX(10px) rotate(9deg); }
  45% { transform: translateX(10px) rotate(-6deg); }
  55% { transform: translateX(10px) rotate(4deg); }
  65% { transform: translateX(6px) rotate(0deg); }
  80% { transform: translateX(-2px) rotate(0deg); }
}

.keyhole {
  animation: bob 3s ease-in-out infinite;
}

@keyframes bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

.spark {
  color: #f59e0b;
  opacity: 0;
  animation: spark 2.4s ease-in-out infinite;
}

@keyframes spark {
  0%, 20%, 40%, 100% { opacity: 0; transform: scale(0.4); }
  28% { opacity: 1; transform: scale(1.1); }
  34% { opacity: 0.6; transform: scale(0.9); }
}

@media (prefers-reduced-motion: reduce) {
  .key, .keyhole, .spark {
    animation: none;
  }
  .spark { opacity: 0; }
}
</style>
