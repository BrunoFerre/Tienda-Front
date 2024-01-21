<template>
      <label class="cursor-pointer label flex items-center justify-start w-[200px] gap-2">
        <input
          name="value"
          type="radio"
          class="checkbox checkbox-success"
          :value="value"
          />
        <span class="label-text">{{ text }}</span>
      </label>
</template>

<script>
export default {
  name: "CheckBox",
  props: ["text", "value"],
}

</script>