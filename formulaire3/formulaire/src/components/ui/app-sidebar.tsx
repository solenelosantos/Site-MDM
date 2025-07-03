import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items avec images SVG (via balise <img />)
const items = [
  {
    title: "Mes informations",
    url: "#",
    icon: "/icons/mon_espace_personnel.svg",
  },
  {
    title: "Mes documents",
    url: "#",
    icon: "/icons/mes_documents.svg",
  },
  {
    title: "Déposer un document",
    url: "#",
    icon: "/icons/deposer_un_document.svg",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <img
                        src={item.icon}
                        alt=""
                        className="w-5 h-5 shrink-0"
                      />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
