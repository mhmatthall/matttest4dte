import style from "./Card.module.scss";

export default function Card({
  headline,
  subhead,
  description,
  actions,
  actionsDivider,
  actionsAlignment = "right",
  variant,
}) {
  return (
    <div className={style["container-" + variant]}>
      {headline && <h1 className={style.headline}>{headline}</h1>}
      {subhead && <h2 className={style.subhead}>{subhead}</h2>}
      {description && <p className={style.description}>{description}</p>}
      {actionsDivider && <div className={style.actionsDivider} />}
      {actions && (
        <div className={style["actions-" + actionsAlignment]}>{actions}</div>
      )}
    </div>
  );
}
