'use client';

import Box from '@mui/material/Box';
import Link from 'next/link';
import { grey } from '@mui/material/colors';
import { Trans } from 'react-i18next';
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import { useState } from 'react';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { path } from '@/config/path';
import { faqContent } from '@/config/faq';
import { Typography } from '@/components/Typography';
import { StandardPage } from '@/components/StandardPage';

const ContactUsLink = styled(Link)(
    ({ theme }) => `
    color: ${theme.palette.primary.light};
    font-size: 22px;
    text-decoration: underline;
`
);

function FAQPage(): JSX.Element {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <StandardPage
            titleId="faq"
            subtitle={
                <Trans
                    i18nKey="contactUsPrompt"
                    components={{ to: <ContactUsLink href={path.contactUs} /> }}
                />
            }>
            <Box>
                {faqContent.map(({ question, answer }) => (
                    <Accordion
                        disableGutters
                        elevation={0}
                        sx={{
                            py: 2,
                            bgcolor: 'transparent',
                            '&:not(:last-child)': {
                                borderBottom: (theme) =>
                                    `1px solid ${theme.palette.primary.light}`
                            }
                        }}
                        key={question}
                        expanded={expanded === `panel-${question}`}
                        onChange={handleChange(`panel-${question}`)}>
                        <AccordionSummary
                            id={`panel-${question}-header`}
                            expandIcon={
                                expanded === `panel-${question}` ? (
                                    <RemoveCircleOutlineIcon
                                        sx={{ color: 'common.white' }}
                                    />
                                ) : (
                                    <AddCircleOutlineIcon
                                        sx={{ color: grey[500] }}
                                    />
                                )
                            }
                            aria-controls={`panel-${question}-content`}>
                            <Typography
                                variant="h5"
                                sx={{ color: grey[500] }}
                                textId={question}
                            />
                        </AccordionSummary>
                        <AccordionDetails sx={{ color: 'common.white' }}>
                            <Typography>
                                <Trans
                                    i18nKey={answer}
                                    components={{
                                        newline: <Box sx={{ pl: 2, pt: 1 }} />
                                    }}
                                />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </StandardPage>
    );
}

export default FAQPage;
