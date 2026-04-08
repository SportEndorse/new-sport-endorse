import styles from "../styles/sofiStudentOffer.module.css";

const sections = [
  {
    title: "1. Up to $300 Bonus Tiered Disclosure",
    body: [
      "New and existing Checking and Savings members who have not previously enrolled in Direct Deposit with SoFi are eligible to earn a cash bonus of either $50 (with at least $1,000 total Eligible Direct Deposits received within 25 calendar days of your first Eligible Direct Deposit of $1 or more) OR $300 (with at least $5,000 total Eligible Direct Deposits received within 25 calendar days of your first Eligible Direct Deposit of $1 or more). Cash bonus amount will be based on the total amount of Eligible Direct Deposit. If you have satisfied the Eligible Direct Deposit requirements but have not received a cash bonus in your Checking account, please contact us at 855-456-7634 with the details of your Eligible Direct Deposit. Direct Deposit Promotion begins on 12/7/2023 and will be available through 12/31/2026. Full terms at sofi.com/banking. SoFi Checking and Savings is offered through SoFi Bank, N.A., Member FDIC.",
      "SoFi members with Eligible Direct Deposit can earn 3.30% annual percentage yield (APY) on savings balances (including Vaults) and 0.50% APY on checking balances. There is no minimum Eligible Direct Deposit amount required to qualify for the 3.30% APY for savings (including Vaults). Members without Eligible Direct Deposit will earn 1.00% APY on savings balances (including Vaults) and 0.50% APY on checking balances. Interest rates are variable and subject to change at any time.",
      "These rates are current as of 12/23/25. There is no minimum balance requirement. Fees may reduce earnings. Additional information can be found at http://www.sofi.com/legal/banking-rate-sheet.",
    ],
  },
  {
    title: "2. APY disclosures",
    body: [
      "Annual percentage yield (APY) is variable and subject to change at any time. Rates are current as of 12/23/25. There is no minimum balance requirement. Fees may reduce earnings. Additional rates and information can be found at https://www.sofi.com/legal/banking-rate-sheet",
    ],
  },
  {
    title: "3. Fee Policy",
    body: [
      "We do not charge any account, service or maintenance fees for SoFi Checking and Savings. We do charge a transaction fee to process each outgoing wire transfer. SoFi does not charge a fee for incoming wire transfers, however the sending bank may charge a fee. Our fee policy is subject to change at any time. See the SoFi Bank Fee Sheet for details at sofi.com/legal/banking-fees/.",
    ],
  },
  {
    title: "4. Additional FDIC Insurance",
    body: [
      "SoFi Bank is a member FDIC and does not provide more than $250,000 of FDIC insurance per depositor per legal category of account ownership, as described in the FDIC's regulations. Any additional FDIC insurance is provided by the SoFi Insured Deposit Program. Deposits may be insured up to $3M through participation in the program. See full terms at SoFi.com/banking/fdic/sidpterms. See list of participating banks at SoFi.com/banking/fdic/participatingbanks.",
    ],
    boldTitle: true,
  },
  {
    title: "5. ATM Access",
    body: [
      "We've partnered with Allpoint to provide you with ATM access at any of the 55,000+ ATMs within the Allpoint network. You will not be charged a fee when using an in-network ATM, however, third-party fees may be incurred when using out-of-network ATMs. SoFi's ATM policies are subject to change at our discretion at any time.",
    ],
  },
  {
    title: "6. Early Access to Direct Deposit Funds",
    body: [
      "Early access to direct deposit funds is based on the timing in which we receive notice of impending payment from the Federal Reserve, which is typically up to two days before the scheduled payment date, but may vary.",
    ],
  },
  {
    title: "7. Overdraft Coverage",
    body: [
      "Overdraft Coverage is a feature automatically offered to SoFi Checking and Savings account holders who receive at least $1,000 or more in Eligible Direct Deposits within a rolling 31 calendar day period on a recurring basis. Eligible Direct Deposit is defined on the SoFi Bank Rate Sheet, available at https://www.sofi.com/legal/banking-rate-sheet. Members enrolled in Overdraft Coverage may be covered for up to $50 in negative balances on SoFi Bank debit card purchases only. Overdraft Coverage does not apply to P2P transfers, bill payments, checks, or other non-debit card transactions. Members with a prior history of unpaid negative balances are not eligible for Overdraft Coverage. Eligibility for Overdraft Coverage is determined by SoFi Bank in its sole discretion. Members can check their enrollment status, if eligible, at any time by logging into their account through the SoFi app or on the SoFi website.",
    ],
  },
  {
    title: "8. 0.70% Savings APY Boost",
    body: [
      "Earn up to 4.00% Annual Percentage Yield (APY) on SoFi Savings with a 0.70% APY Boost (added to the 3.30% APY as of 12/23/25) for up to 6 months. Open a new SoFi Checking and Savings account and pay the $10 SoFi Plus subscription every 30 days OR receive eligible direct deposits OR qualifying deposits of $5,000 every 31 days by 3/30/2026. Rates variable, subject to change. Terms apply at sofi.com/banking#2. SoFi Bank, N.A. Member FDIC.",
    ],
  },
];

export default function SoFiStudentOffer() {
  return (
    <section className={styles.sofiOffer} aria-labelledby="sofi-offer-title">
      <h1 id="sofi-offer-title">SoFi Checking &amp; Savings - Disclosures</h1>

      {sections.map((section) => (
        <article className={styles.sofiOfferSection} key={section.title}>
          <h2
            className={
              section.boldTitle
                ? `${styles.sofiOfferSectionTitle} ${styles.sofiOfferSectionTitleBold}`
                : styles.sofiOfferSectionTitle
            }
          >
            {section.title}
          </h2>

          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
      ))}
    </section>
  );
}