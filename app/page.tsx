import { Suspense } from "react";
import Weathers from "./components/Weathers";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Weathers />
    </Suspense>
  );
}
