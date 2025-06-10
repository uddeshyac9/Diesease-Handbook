import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    // Use a plain Stack navigator instead of bottom-tabs
    <Stack
      screenOptions={{
        headerShown: false, // set to true if you want a header bar
      }}
    >
      {/* Register the 'index' route (app/index.tsx) as your Home screen */}
      <Stack.Screen name="index" />
    </Stack>
  );
}
