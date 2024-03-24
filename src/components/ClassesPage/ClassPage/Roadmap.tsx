import { ScrollArea } from "@/components/ui/scroll-area";
import { TechnologyType } from "@/types";
import { CustomFlowbiteTheme, Timeline } from "flowbite-react";
import { HiOutlineChevronRight } from "react-icons/hi";

const customTheme: CustomFlowbiteTheme["timeline"] = {
  root: {
    direction: {
      vertical:
        "relative border-l border-custom-light-text/20 dark:border-custom-dark-text/20",
    },
  },
  item: {
    point: {
      marker: {
        base: {
          vertical:
            "absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-custom-light-accent bg-custom-light-accent dark:border-custom-dark-primary dark:bg-custom-dark-primary",
        },
      },
    },
  },
};

export function Roadmap({ tech }: { tech: TechnologyType }) {
  return (
    <div className="flex flex-col gap-5 mt-12">
      <p className="text-3xl font-semibold">Ruta de aprendizaje</p>
      <p className="max-w-[80ch]">
        Cada tecnología tiene una ruta de aprendizaje cuando se inicia con un
        nivel principiante. Para aprender a programar te recomiendo empezar con
        PSeInt, ya que ahí se verán las bases de los algoritmos.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tech.roadmap.map((card, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 px-5 py-4 rounded-lg bg-custom-light-secondary/5 dark:bg-custom-dark-bg border border-custom-light-text/10 dark:border-custom-dark-text/20"
          >
            <p className="text-2xl font-semibold">{card.title}</p>
            <ScrollArea className="h-152 md:h-112">
              <div className="px-1.5">
                <Timeline theme={customTheme}>
                  {card.items.map((item) => (
                    <Timeline.Item key={item.level} className="mb-8">
                      <Timeline.Point />
                      <Timeline.Content>
                        <Timeline.Title>
                          {item.level}. {item.title}
                        </Timeline.Title>
                        <Timeline.Body className="pt-2">
                          <ul className="flex flex-col gap-1 text-sm">
                            {item.content.map((element, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-1.5"
                              >
                                <HiOutlineChevronRight className="flex-none mt-1" />{" "}
                                <span>{element}</span>
                              </li>
                            ))}
                          </ul>
                        </Timeline.Body>
                      </Timeline.Content>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>
            </ScrollArea>
          </div>
        ))}
      </div>
    </div>
  );
}
