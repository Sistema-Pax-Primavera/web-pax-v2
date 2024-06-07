import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  accordionContainer: {
    border: `1px solid rgba(0, 0, 0, 0.1)`,
    borderColor: theme.palette.grey[300],
    borderRadius: theme.shape.borderRadius,
  },
  accordion: {
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    "&.Mui-expanded": {
      borderColor: "rgba(255, 0, 0, 0.5)",
    },
  },
}));

const MyAccordion = ({ title, icon, expandedIcon, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.accordionContainer}>
      <Accordion className={classes.accordion}>
        <AccordionSummary expandIcon={expandedIcon}>
          <div className="icones-nome">
            {icon}
            <Typography>
              <label>{title}</label>
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="layout-linha">{children}</div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MyAccordion;
