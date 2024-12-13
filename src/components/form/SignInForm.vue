<script setup>
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
</script>

<template>
  <FormField v-slot="{ componentField }" name="email">
    <FormItem>
      <FormLabel>Email Address</FormLabel>
      <FormControl>
        <Input type="text" v-bind="componentField" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
  <FormField v-slot="{ componentField }" name="password">
    <FormItem>
      <div class="flex justify-between">
        <FormLabel>Password</FormLabel>
        <div class="text-sm">
          <a href="#" class="font-semibold text-gray-600 hover:text-gray-500">
            Forget password?
          </a>
        </div>
      </div>
      <FormControl>
        <Input type="password" v-bind="componentField" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
