import { List, ListItem } from "@/components/common/List";
import style from "./SettingsLayout.module.scss";

export default function SettingsLayout({ children }) {
  return (
    <>
      <div className={style.listPane}>
        <h1 className={style.header}>Settings</h1>
        <List>
          <ListItem
            label="Account"
            subLabel="Your details, account info, profile picture"
            glyph="account_circle"
            href="/dashboard/settings/account"
          />
          <ListItem
            label="About cronicl"
            subLabel="Credits, version info, licences"
            glyph="info"
            href="/dashboard/settings/about"
          />
        </List>
      </div>
      <div className={style.detailPane}>{children}</div>
    </>
  );
}
