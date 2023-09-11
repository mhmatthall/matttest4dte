import { useState } from "react";
import style from "./TextField.module.scss";

export default function TextField({
  variant,
  fieldType,
  isDisabled,
  label,
  placeholder,
  supportingText,
  leadingIconGlyph,
  trailingIconGlyph,
  htmlName,
  onChange,
  onTrailingIconClick,
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  // I apologise for the following
  let fieldAreaPaddingStyle =
    leadingIconGlyph && trailingIconGlyph
      ? "Both"
      : !(leadingIconGlyph || trailingIconGlyph)
      ? "No"
      : leadingIconGlyph
      ? "Leading"
      : "Trailing";

  if (fieldAreaPaddingStyle === "Both" && !focused) {
    fieldAreaPaddingStyle = "Leading";
  } else if (fieldAreaPaddingStyle === "Trailing" && !focused) {
    fieldAreaPaddingStyle = "No";
  }

  return (
    <div className={style["container-" + variant]}>
      {isDisabled && <div className={style.disabledOverlay} />}
      <div className={style.textField}>
        <div
          className={style["textFieldArea" + fieldAreaPaddingStyle + "Icon"]}
        >
          {leadingIconGlyph && (
            <div className={style.leadingIcon}>
              <span className={style["material-symbols-outlined"]}>
                {leadingIconGlyph}
              </span>
            </div>
          )}
          <div className={style.content}>
            <label htmlFor={htmlName} className={style.label}>
              {label}
            </label>
            <input
              {...props}
              type={fieldType}
              readOnly={isDisabled}
              id={htmlName}
              name={htmlName}
              placeholder={placeholder}
              className={style.input}
              onChange={onChange}
              onFocus={isDisabled ? null : onFocus}
              onBlur={onBlur}
            />
          </div>
          <div
            onClick={onTrailingIconClick}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            className={style.trailingIconContainer}
          >
            {focused && trailingIconGlyph && (
              <div className={style.trailingIcon}>
                <span className={style["material-symbols-outlined"]}>
                  {trailingIconGlyph}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={style.activeIndicator} />
      {supportingText && (
        <div className={style.supportingText}>{supportingText}</div>
      )}
    </div>
  );
}
