import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='(tabs)' />
      <Stack.Screen
        name="edit-meal/[id]"
        options={{
          // headerShown: true,
          title: 'Edit Meal',
          presentation: 'modal', // optional: slides up like a modal
        }}
      />
    </Stack>
  );
}