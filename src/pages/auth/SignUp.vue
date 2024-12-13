<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Baby } from "lucide-vue-next";

import UserForm from "@/components/form/UserForm.vue";
import userFormSchema from "@/components/formSchema/UserFormSchema";
import { Button } from "@/components/ui/button";

const formSchema = toTypedSchema(userFormSchema());
const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  console.log("Form submitted!", values);
});
</script>

<template>
  <div
    class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="flex justify-center">
        <Baby :size="40" />
      </div>
      <h2
        class="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Create new account
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit="onSubmit">
        <UserForm />
        <div>
          <Button
            type="submit"
            class="flex w-full justify-center rounded-sm font-semibold"
          >
            Create new account
          </Button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm">
        Already have account?
        <RouterLink to="/auth/signIn" class="font-semibold">
          Sign in
        </RouterLink>
      </p>
    </div>
  </div>
</template>
