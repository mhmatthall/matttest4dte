import NavButton from "./NavButton";
import style from "./NavRail.module.scss";

export default function NavRail() {
  return (
    <div className={style.container}>
      <nav className={style.content}>
        <NavButton href={"/dashboard"} label={"Home"} glyph={"home"} />
        <NavButton href={"/dashboard/map"} label={"Map"} glyph={"map"} />
        <NavButton
          href={"/dashboard/scrapbook"}
          label={"Scrapbook"}
          glyph={"stylus_note"}
        />
        <NavButton
          href={"/dashboard/insights"}
          label={"Insights"}
          glyph={"query_stats"}
        />
      </nav>
      <div className={style.footer}>
        <NavButton href={"/dashboard/settings"} glyph={"account_circle"} />
      </div>
    </div>
  );
}
