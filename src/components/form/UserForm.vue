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
  <FormField v-slot="{ componentField }" name="userName">
    <FormItem>
      <FormLabel>이름</FormLabel>
      <FormControl>
        <Input type="text" v-bind="componentField" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
  <FormField v-slot="{ componentField }" name="email">
    <FormItem>
      <FormLabel>이메일 주소</FormLabel>
      <FormControl>
        <Input type="text" v-bind="componentField" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
  <FormField v-slot="{ componentField }" name="password">
    <FormItem>
      <FormLabel>비밀번호</FormLabel>
      <FormControl>
        <Input
          type="password"
          placeholder="영문+숫자+특수문자 (8~15자리)"
          v-bind="componentField"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
  <FormField v-slot="{ componentField }" name="verifyPassword">
    <FormItem>
      <FormLabel>비밀번호 확인</FormLabel>
      <FormControl>
        <Input
          type="password"
          placeholder="영문+숫자+특수문자 (8~15자리)"
          v-bind="componentField"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
