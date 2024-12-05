import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { IconType } from "react-icons";
import {
  HiChartPie,
  HiCog6Tooth,
  HiFolderOpen,
  HiHeart,
  HiInbox,
  HiMagnifyingGlass,
  HiOutlineChartPie,
  HiOutlineCog6Tooth,
  HiOutlineFolder,
  HiOutlineHeart,
  HiOutlineInbox,
  HiOutlineMagnifyingGlass,
  HiOutlineRocketLaunch,
  HiPlus,
  HiRocketLaunch,
} from "react-icons/hi2";

import Tooltip from "@components/global/Tooltip/Tooltip";

interface SidebarLink {
  title: string;
  icon: IconType;
  activeIcon: IconType;
  activeClass?: string;
  href: string;
}

const links: SidebarLink[] = [
  {
    title: "Directory",
    icon: HiOutlineFolder,
    activeIcon: HiFolderOpen,
    href: "/",
  },
  {
    title: "Favorites",
    icon: HiOutlineHeart,
    activeIcon: HiHeart,
    activeClass: "text-rose-500",
    href: "/favorites",
  },
  {
    title: "Inbox",
    icon: HiOutlineInbox,
    activeIcon: HiInbox,
    activeClass: "text-lime-500",
    href: "/watching",
  },
  {
    title: "Explore",
    icon: HiOutlineRocketLaunch,
    activeIcon: HiRocketLaunch,
    activeClass: "text-cyan-400",
    href: "/explore",
  },
  {
    title: "Analysis",
    icon: HiOutlineChartPie,
    activeIcon: HiChartPie,
    activeClass: "text-purple-500",
    href: "/analysis",
  },
  {
    title: "Search",
    icon: HiOutlineMagnifyingGlass,
    activeIcon: HiMagnifyingGlass,
    activeClass: "text-primary",
    href: "/search",
  },
];

const SidebarButton = ({
  title,
  icon: Icon,
  activeIcon: ActiveIcon,
  activeClass,
  href,
  baseUrl,
}: {
  title: string;
  icon: IconType;
  activeIcon: IconType;
  activeClass?: string;
  href?: string;
  baseUrl: string;
}) => {
  const btnClass = `block p-2 rounded-md ${baseUrl == href ? "bg-secondary-hover active:bg-secondary-active " + activeClass : "text-fg-tertiary hover:text-fg active:text-fg hover:bg-secondary active:bg-secondary-hover"}`;

  return (
    <>
      <div className="pb-2">
        <Tooltip text={title} direction="right" offset={15}>
          {href ? (
            <Link href={href} className={btnClass}>
              {baseUrl === href ? (
                <ActiveIcon className="h-6 w-6" />
              ) : (
                <Icon className="h-6 w-6" />
              )}
            </Link>
          ) : (
            <button type="button" className={btnClass}>
              {" "}
              {baseUrl === href ? (
                <ActiveIcon className="h-6 w-6" />
              ) : (
                <Icon className="h-6 w-6" />
              )}
            </button>
          )}
        </Tooltip>
      </div>
    </>
  );
};

const Sidebar = () => {
  const pathname = usePathname();
  const baseUrl = "/" + pathname.split("/")[1];

  return (
    <>
      <div className="relative min-w-14"></div>

      <div className="fixed top-0 left-0 bottom-0 h-full min-w-14 max-w-14 bg-bg-sidebar border-r border-border">
        <div className="m-2 p-1 w-10 h-10 rounded-md">
          <Image src="/logo.svg" width={40} height={40} alt="Logo" />
        </div>

        <div className="my-2 mx-2 h-px bg-border"></div>

        <div className="p-2 mt-2">
          {links.map((l, i) => (
            <SidebarButton
              key={i}
              title={l.title}
              icon={l.icon}
              activeIcon={l.activeIcon}
              activeClass={l.activeClass}
              href={l.href}
              baseUrl={baseUrl}
            />
          ))}

          <div className="mb-4 mt-2 h-px w-full bg-border"></div>

          <div className="pb-2">
            <Tooltip text="Add Repository" direction="right" offset={15}>
              <Link
                type="button"
                className={clsx(
                  "block p-2 rounded-md",
                  baseUrl === "/add"
                    ? "scale-90 bg-primary-active shadow-[0_0_5px_2px_rgba(var(--primary-active))]"
                    : "text-link hover:text-primary-fg active:text-primary-fg bg-primary/30 hover:bg-primary-hover active:bg-primary-active",
                )}
                href="/add"
              >
                <HiPlus className="h-6 w-6" />
              </Link>
            </Tooltip>
          </div>

          <div className="absolute bottom-0">
            <SidebarButton
              title="Settings"
              icon={HiOutlineCog6Tooth}
              activeIcon={HiCog6Tooth}
              activeClass="text-primary"
              href="/settings"
              baseUrl={baseUrl}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
