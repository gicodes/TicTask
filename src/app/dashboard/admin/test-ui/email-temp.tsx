import React from "react";
import styles from "./page.module.css";

type Props = {
  subject: string;
  title?: string;
  subtitle?: string;
  body1: string;          
  body2?: string;         
  closingRemark?: string;
};

const EmailTemplate: React.FC<Props> = ({
  title,
  subtitle,
  body1,
  body2,
  closingRemark = "Best regards,<br/>The TicTask Team",
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <span>Tic</span>
          <span className={styles.customDull}>Task</span>
        </div>
      </div>

      <div className={styles.main}>
        {(title || subtitle) && (
          <div className={styles.headerTitles}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <h4 className={styles.subtitle}>{subtitle}</h4>}
          </div>
        )}

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: body1 }}
        />

        {body2 && (
          <div
            className={styles.content}
            style={{ marginTop: 16 }}
            dangerouslySetInnerHTML={{ __html: body2 }}
          />
        )}

        <div
          className={styles.content}
          style={{ marginTop: 24 }}
          dangerouslySetInnerHTML={{ __html: closingRemark }}
        />
      </div>

      <div className={styles.footer}>
        © {new Date().getFullYear()} TicTask. All rights reserved.
      </div>
    </div>
  );
};

export default EmailTemplate;