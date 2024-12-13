<script setup>
import { RouterLink } from "vue-router";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Baby } from "lucide-vue-next";

import SignInForm from "@/components/form/SignInForm.vue";
import SignInFormSchema from "@/components/formSchema/SignInFormSchema";
import { Button } from "@/components/ui/button";

const formSchema = toTypedSchema(SignInFormSchema());
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
        Sign in to your account
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit="onSubmit">
        <SignInForm />
        <div>
          <Button
            type="submit"
            class="flex w-full justify-center rounded-sm font-semibold"
          >
            Sign in
          </Button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm">
        Don&apos;t have account yet?
        <RouterLink to="/auth/signUp" class="font-semibold">
          Sign up
        </RouterLink>
      </p>
    </div>
  </div>
</template>
