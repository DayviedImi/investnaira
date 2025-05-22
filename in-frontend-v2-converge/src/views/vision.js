import React from "react";

import AuthHOC from "./authHOC";
import "../assets/css/vision.css";

export default function Vision(props) {
  return (
    // <AuthHOC header="Welcome to the Generational Wealth Ark">
    //   <div className="visionContainer">
    //     <p>
    //       <strong>Our Vision: </strong>InvestNaira would build generational wealth for individuals
    //       (families) and nations.
    //     </p>
    //     <p>
    //       <strong>Our Mission: </strong>through the three-pronged approach of saving, investing, and
    //       compounding, we would build financial arks as business empires that would deliver
    //       generational wealth on a national level.
    //     </p>
    //     <p>Dear Wealth Partner,</p>
    //     <p>
    //       When we started InvestNaira, we intended on building a Financial Ark that would sustain
    //       the wealth on a generational basis for all our clients. We fashioned that this would be
    //       done by three overarching pitches.
    //     </p>
    //     <ul>
    //       <li>Saving Smartly</li>
    //       <li>Investing Wisely</li>
    //       <li>Compounding Wealth</li>
    //     </ul>
    //     <p>We speak briefly on these pitches.</p>
    //     <p>
    //       <strong>Saving Smartly: </strong>We believe wealth is not a function of how much you earn,
    //       but how much you save. When expenses shrink as a percentage of income, savings increase. A
    //       savings attitude engenders a wealthy lifestyle. We would continue to innovate on ways to
    //       Save Smartly through our SIC® seminars, our rich educational portal, and our financial
    //       literacy blog, NairaSense®.
    //     </p>
    //     <p>
    //       <strong>Investing Wisely: </strong>Next in the ladder of wealth is a healthy investment
    //       mindset. Our three funds - Conservative, Balanced & Aggressive - gives you an opportunity
    //       to match your personality and lifestyle to your risk level. Our intent is to invest in
    //       asset classes with a long-term risk-adjusted framework to compound wealth. We would not
    //       invest in what we do not have adequate experience, growing expertise, and deep
    //       understanding.
    //     </p>
    //     <p>
    //       <strong>Compounding Wealth: </strong>Greatness is borne of passionate focus & relentless
    //       perseverance, sun-like consistency & seasons-like commitment. Our promise is to:
    //     </p>
    //     <ul>
    //       <li>Passionately focus on the science & art of compounding wealth;</li>
    //       <li>Persevere relentlessly on building a financial ark for posterity;</li>
    //       <li>Consistently strive to deliver highest returns per naira invested;</li>
    //       <li>Committedly repeat what works over & over again;</li>
    //     </ul>
    //     <p>
    //       We believe wealth delivers from the intersection of these traits. And that is what we aim
    //       to build at InvestNaira.
    //     </p>
    //     <p>
    //       <strong>OUR FAITH SYSTEM - CORE VALUES </strong>
    //     </p>
    //     <p>
    //       Our Core Values of Faith gives us the confidence to continue to build on a bold promise.
    //       These Faith System - Core Values - define the bedrock upon which we would build the
    //       edifice of a financial ark for all our clients.
    //     </p>
    //     <p>Our core values is codified in the word S.A.G.E</p>
    //     <p>S-Stewardship | A-Action | G-Grit | E-Energy </p>
    //     <p>
    //       <strong>Stewardship - </strong>Accountability & Integrity. We are stewards in all that we
    //       do. Our stewardship is first unto the Sovereign, next to our ArkBuilders, and finally to
    //       our teammates. We would at all times strive to engender transparent accountability and
    //       untainted integrity. #StewardshipbySovereignity
    //     </p>
    //     <p>
    //       <strong>Action- </strong>Resourcefulness & Adaptability. We are not afraid to march our
    //       10x goals with 100x action. When we smash our 10x goals, we celebrate quietly, then hunt
    //       for 100x goals. We don't wait for the stars to come ashore, we sail for a grasp.
    //       #10xGoals100xAction
    //     </p>
    //     <p>
    //       <strong>Grit - </strong>Passion & Perseverance. We never give up. We never-say-never. We
    //       would out-work, out-do & out-compete our last trough. We don't give, trade or receive
    //       excuses. Our perseverance is indomitable, our passion is unstoppable. We just Do.
    //       #IndomitableandUnstoppable.
    //     </p>
    //     <p>
    //       <strong>Energy - </strong>Empire Builders & Industry Giants. Impossibility is something we
    //       are excited about. Tell us “impossible” and we would turn your water to wine. Energy is
    //       what turns zero to one, nothing to everything, and impossible to inevitable. Really, we
    //       are the first testament of our dictum, from Nothing, InvestNaira came. #ZerotoOne From
    //       Nothing to Nations
    //     </p>
    //     <p>
    //       <strong>Spirit - the Unseen force behind all things. </strong>At InvestNaira, we believe
    //       in the Spiritual Force, the Word of God, by which all things were made. Specifically,
    //       during the course of our founding, there were scriptures which spoke to our journey and
    //       whose veracity would serve as anchor for us, eternally. Below, we share these words of
    //       life.
    //     </p>
    //     <p>
    //       <strong>Faith Scriptures</strong>
    //     </p>
    //     <ul>
    //       <li>The Voice - Gen 6:14 - Build me a financial ark </li>
    //       <li>
    //         The Tool Exo 31:2,3 - I have put in him the Spirit of God in all manner of workmanship{" "}
    //       </li>
    //       <li>The Power - Deut 8:18 - I have given you power to get wealth </li>
    //       <li>
    //         The Seed Mark 4:32 - it shooteth out grea branches, and all the birds of the earth lodge
    //         under it.
    //       </li>
    //     </ul>
    //     <p>
    //       Want to be a S.A.G.E, talk to us <a href="mailto:invest@investnaira.com">here</a>
    //     </p>
    //     <p>
    //       Our goal to build an ark for the long haul drives all our operations. We plan to stay true
    //       to that course. And this is just a first ‘log of wood’ in the Ark of Financial Wealth.
    //     </p>
    //     <p>
    //       Dear Partner, we acknowledge your faith in investing the blood, sweat & tears of your
    //       labour – Capital Assets – with InvestNaira. We would work assiduously to build a life-long
    //       financial ark that helps you Save Smartly, Invest Wisely& Compound Wealth.
    //     </p>
    //     <p>
    //       We would love to add a caveat here. Do not Judge us by the monthly, quarterly or yearly
    //       returns. That is the ebb & flow of the financial markets we are invested in. But, judge us
    //       by our ability to Save, Invest & Compound Wealth with you over a long term, a life-time
    //       that is.
    //     </p>
    //     <p>Thank you for making it aboard the Financial Ark.</p>
    //     <p>Ebube & Toni</p>
    //     <p> Ark Builders @ InvestNaira</p>
    //   </div>
    // </AuthHOC>
    <AuthHOC header="Invest Naira - CULTURE DECK ">
    <div className="visionContainer">
      <p>
        <strong>Our Motto - </strong>BUILD WEALTH
      </p>
      <p>
        <strong>Our Vision - </strong>InvestNaira has a vision to build wealth for Individuals, Organisations & Nations over the LONG TERM - Sustainable, Multi-Generational, Compounding.
      </p>
      <p>
        <strong>Our Mission - </strong>InvestNaira has a mission to help people save, invest and build wealth by creating, investing, and developing opportunities for the LONG TERM.
      </p>
      <p><strong>OUR FAITH SYSTEM -CORE VALUES </strong></p>
      <p>
      Faith is the Substance and Evidence of all that is Unseen. Everything that lasts, sits on principles. And Faith - the invisible law of the unseen - is what all natural Principles sit on. At Invest Naira, our Faith System - Core Values - defines the bedrock upon which we would build the edifice of a financial ark for all our clients of Ark Builders.
      </p>
      <p>Our Faith System is codified in the word: </p>
        <p><strong>S.A.G.E. - Stewardship | Action | Grit | Energy </strong></p>
      <ul>
        <li>
          <p>
          <strong>Stewardship - </strong><em>Accountability & Integrity</em>. We are stewards in all that we do. Our stewardship is first unto the Sovereign, next to our ArkBuilders, and finally to ourselves. We would at all times strive to engender transparent accountability and untainted integrity. #StewardshipbySovereignity 
        </p>
        </li>
        <li>
          <p>
          <strong>Action - </strong><em>Resourcefulness & Adaptability</em>. We are not afraid to march our 10x goals with 100x action. When we smash our 10x goals, we celebrate quietly, then hunt for 100x goals. We don't wait for the stars to come ashore, we sail for a grasp. #10xGoals100xAction 
        </p>
        </li>
        <li>
          <p>
          <strong>Grit  - </strong><em>Passion & Perseverance</em>. We never give up. We never-say-never. We would out-work, out-do & out-compete our last trough. We don't give, trade or receive excuses. Our perseverance is indomitable, our passion is unstoppable. We just Do. #IndomitableandUnstoppable. 
        </p>
        </li>
        <li>
          <p>
          <strong>Energy - </strong><em>Nothing to  Everything</em>.Impossibility is something we are excited about. Tell us “impossible” and we would turn your water to wine. Energy is what turns zero to one, nothing to everything and impossible to inevitable. Really, we are the first testament of our dictum, from Nothing, InvestNaira came. #ZerotoOne
        </p>
        </li>
      </ul>
      <p><strong>Our VALUE SYSTEM</strong></p>
      <p>
      Our values as a firm determine who gets to stay with us and who exits. Below, we detail our value system, character & skills we deeply cherish. If you reflect these values and would want to work with people who mirror these, you would grow with us at InvestNaira. </p>
      <ol>
        <li>We Value the BLACK-SWAN mindset </li>
        <li>We value LOVE</li>
        <li>We value GRIND</li> 
        <li>We Value GRIT</li> 
        <li>We Value CURIOSITY</li>
        <li>We Value PASSION</li>
        <li>We value INTUITION</li>
        <li>We Value EXECUTION</li>
        <li>We Value RISK-TAKING</li> 
      </ol>
      <p><strong>BLACK SWAN</strong></p>
      <ul>
        <li>Your mantra, ‘If it’s never been done, I would DO IT, then!</li>
        <li>You don’t have a problem standing-out</li>
        <li>You think at an order of magnitude across existing consensus</li>
        <li>You love to Invert, Always Inverting.</li>
        <li>You would challenge the ‘IM’ in Im-possible</li>
      </ul>
      <p><strong>LOVE</strong></p>
      <ul>
        <li>You have Faith in the Impossible</li>
        <li>You deeply care and genuinely show interest in your teammates</li>
        <li>You are known for candor, authenticity, & transparency.</li>
        <li>Your enthusiasm for people always leaves them a better version</li>
        <li>Your teammates know you would take a bullet, well almost, for them. </li>
      </ul>
      <p><strong>GRIT</strong></p>
      <ul>
        <li>You don’t give up on what you care about, never. </li>
        <li>You care deeply enough to make sacrificial decisions </li>
        <li>You are sold-out, committed, and would give all it takes </li>
        <li>Your determination never expires </li>
        <li>Your drive is long-term wired; yet day in, day out, you are game</li>
      </ul>
      <p><strong>GRIND</strong></p>
      <ul>
        <li>You outwork anyone in the room</li>
        <li>You have the capacity to expand your output consistently</li>
        <li>You never leave an important task undone, no matter what</li>
        <li>You see challenges as an opportunity to scale your current Everest</li>
        <li>You bring your A-Game consistently to all you do. </li>
      </ul>
      <p><strong>CURIOSITY</strong></p>
      <ul>
        <li>You acquire Knowledge at an order of magnitude; in breadth and depth </li>
        <li>You see what you don’t know as an opportunity to expand learning</li>
        <li>You seek a broad understanding of multiple subjects in multiple fields. </li>
        <li>You are always tinkering & thinking of better ways to improve things.</li>
      </ul>
      <p><strong>INTUITION</strong></p>
      <ul>
        <li>You see what others miss and connect the dots easily. </li>
        <li>You are able to see how seemingly disparate things make the whole</li>
        <li>You are able to project the future and bet on your gut.</li>
        <li>You possess insight, foresight, and hindsight on business decisions. </li>
      </ul>
      <p><strong>EXECUTION</strong></p>
      <ul>
        <li>Your bias towards action ensures you take positive steps, consistently.</li>
        <li>Your posses an uncanny ability to bring ideas to life once you understand the process</li>
        <li>Your performance ranks consistently in the top 5% of exceptional achievers</li>
        <li>You trust the process but focus on results. </li>
      </ul>
      <p><strong>EXECUTION</strong></p>
      <ul>
        <li>You take actions because it is right, not because you are comfortable</li>
        <li>You love adrenaline-thumping sports, and love to be at the center of action.</li>
        <li>You are not afraid to lose control, while still steering towards the right course</li>
        <li>You love the MoonShot - high risk taking, with an order of magnitude in impact.</li>
      </ul>
      <p>These values in our people translate to a team whose core is to go <em>boldly</em> where no one has gone before - on the crater of opportunity. </p>
      <p>We understand we are in challenging and quite incredible terrain. Much more than ever, the desire to seek ‘greener pastures’ or find an <em>escape hatch</em> runs on the mind of most growing people.</p>
      <p>But we believe, <em>every nation is built by a man (some men).</em> And while there is a chance we might fail, we would rather take that moonshot opportunity to make a difference. The flip side of the coin is regret for <em>not giving it our try</em> - an option we do not have.</p>
      <p>Being on our Team means you are ready to dare the impossible, be riddled by the cynical, and shine despite the obstacles!</p>
      <p>We are building a team of thoughtful, committed and incredibly passionate people, who would change the world. </p>
      <p>Even if you don't see fit, you still get the chance to join us on the sidelines, cheering us on, as a client - an ARKBUILDER - Join HERE!</p>
      <p><strong>AN ARKER</strong></p>
      <p><strong>Who is an Arker?</strong></p>
      <p>An arker is someone who builds an ark.</p>
      <p>At InvestNaira, we see our purpose as building a wealth ark for generations, a financial bunker that perpetuates wealth from one lineage to the other. In order to build such structure, we believe the value we bring lies in the sectors we contribute to.</p>
      <p>We are firm believers in our nation, Nigeria, and see that it is untapped, undiscovered, un-mined value.</p>
      <p><strong>OUR NORTHSTAR - 1N=1$</strong></p>
      <p>Sometimes in 1983, a naira exchanged for a dollar. Today, the Naira has depreciated by over four hundred times what it used to exchange at the official window.</p>
      <p>In a nation with one of the youngest working populations in the world, our country has the potential to unleash the next wave of industrialization on our world. </p>
      <p>We believe, as a company, we would harness this untapped potential and build companies, across sectors, industries, and our economy, that would give value to our currency.</p>
      <p>The Naira holds value, if its citizens invest in its economy. </p>
      <p>As a company, we would always INVEST NAIRA. </p>
      <p>We would INVEST NAIRA to build our national economy. </p>
      <p>We would INVEST NAIRA to harness our untapped resources </p>
      <p>We would INVEST NAIRA to generate employment opportunities for our populace.</p>
      <p>We would INVEST NAIRA to export our processed raw materials across the world. </p> 
      <p>We would INVEST NAIRA to boost the exchange rate of our currency. Until a  naira holds the same value as a dollar. A moonshot, but one we are willing to stake all our bold daring on. </p>
      <p><strong>WORKING WITH US - Building Long Term Value</strong></p>
      <p>At InvesNaira, we believe hiring should be like building a long-lasting relationship. Two people come together and speak, the first time. Then each person asks how the other party would add value. If there is no value in the relationship, you just let it fizzle or remain ‘hi-hi’ buddies</p>
      <p>However, if the value lies, then it should be nurtured, daily, consistently, for the long term.</p>
      <p>At InvestNaira joining as an <strong>ARK-ER*</strong> would be a lifelong relationship, not an interview - hire to fire - process. We, therefore, ask that you show us a <strong>‘VALUE PROPOSAL’</strong> rather than send in an <strong>APPLICATION LETTER.</strong> </p>
      <p>In the long run -those who are valued the most came with value, delivered value, and together, we continue to build value - for the LONG TERM.  </p>
      <p>Our goal is to inspire and provide an environment where you can continue to dream the impossible, dare the un-dareable and execute on the moonshot.</p>
      <p>We would continue to be a firm that builds long term value in all our offerings.  </p>
      <p>For the freedom to go boldly to the crater of opportunity, InvestNaira exists. </p>
      <p>And in committing to that desire to build long-term value, we have a fiduciary responsibility to ensure you are GENERATIONALLY WEALTHY. </p>
      <p>Want to be an ARKER, begin here, <a href='https://docs.google.com/forms/d/14KwZPHuMbG_TnraiY0-_HmkT5GLKoaxlNnOTRQM2irM/edit?usp=send_form&usp=redirect_edit_m2'>Join Here</a></p> 
      <p><strong>*An Arker - is one of the amazing team mates helping to BUILD WEALTH at InvestNaira or any of its affiliates.</strong></p>
    </div>
  </AuthHOC>
  );
}
