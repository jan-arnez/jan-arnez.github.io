import { experience } from "../data/experience.ts";

export function Hero() {
  return (
    <div className="flex flex-col gap-8 lg:pt-42 xl:grid xl:grid-cols-2">
      <h1 className="text-5xl leading-[1.1] font-semibold tracking-tight md:text-6xl">
        I&apos;m Jan,{" "}
        <em className="inline-block whitespace-nowrap text-primary">a product-minded</em>{" "}
        <span className="inline-block whitespace-nowrap">software engineer</span>
      </h1>

      <div className="flex w-full flex-col justify-end gap-y-2">
        {experience.map((item) => (
          <div
            key={`${item.year}-${item.company}`}
            className="grid w-full grid-cols-6 gap-x-8 text-muted-foreground"
          >
            <div>{item.year}</div>
            <div className="col-span-2 text-foreground">{item.company}</div>
            <div className="col-span-3">{item.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
