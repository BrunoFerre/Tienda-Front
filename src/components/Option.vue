<template>
      <option :value="valor">{{ texto }}</option>
</template>

<script>
export default {
  name: "Option",
  props: ["texto", "valor"],
};
</script>