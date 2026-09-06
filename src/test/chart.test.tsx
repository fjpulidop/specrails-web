import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ChartContainer, ChartLegendContent, ChartTooltipContent } from "@/components/ui/chart";
import type { TooltipPayloadEntry } from "recharts";

vi.mock("recharts", async importOriginal => ({
  ...await importOriginal<typeof import("recharts")>(),
  ResponsiveContainer: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

function chart(content: ReactNode) {
  return render(<ChartContainer config={{ requests: { label: "Requests", color: "#00bbcc" } }}>{<>{content}</>}</ChartContainer>);
}

describe("chart content compatibility", () => {
  it("renders a zero tooltip value without requiring a nested source record", () => {
    chart(<ChartTooltipContent active payload={[{ graphicalItemId: "requests", dataKey: "requests", name: "requests", value: 0, color: "#00bbcc" }]} />);
    expect(screen.getByText("0")).toBeVisible();
    expect(screen.getAllByText("Requests").length).toBeGreaterThan(0);
  });

  it("passes the complete Recharts payload to the value formatter", () => {
    const payload: TooltipPayloadEntry[] = [
      { graphicalItemId: "requests", dataKey: "requests", name: "requests", value: 7, payload: { requests: 7 } },
      { graphicalItemId: "errors", dataKey: "errors", name: "errors", value: 2, payload: { errors: 2 } },
    ];
    const formatter = vi.fn((_value, _name, _item, _index, entries) => `${entries.length} series`);
    chart(<ChartTooltipContent active payload={payload} formatter={formatter} />);
    expect(formatter).toHaveBeenNthCalledWith(1, 7, "requests", payload[0], 0, payload);
    expect(formatter).toHaveBeenNthCalledWith(2, 2, "errors", payload[1], 1, payload);
    expect(screen.getAllByText("2 series")).toHaveLength(2);
  });

  it("accepts the injected legend payload and hides an inactive tooltip", () => {
    chart(<><ChartLegendContent payload={[{ dataKey: "requests", value: "requests", color: "#00bbcc" }]} /><ChartTooltipContent active={false} payload={[{ graphicalItemId: "hidden", name: "hidden", value: 42 }]} /></>);
    expect(screen.getByText("Requests")).toBeVisible();
    expect(screen.queryByText("42")).toBeNull();
  });
});
