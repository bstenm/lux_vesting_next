'use client';

/* eslint-disable max-len, prettier/prettier */

import { Redirect, Route, Switch } from 'next/link';

import { landing } from 'pages/LandingPage';
import { whoWeAre } from 'pages/WhoWeArePage';
import { notFound } from 'pages/NotFoundPage';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { marketplace } from 'pages/MarketplacePage';
import { somethingWentWrong } from 'pages/SomethingWentWrongPage';
import { merchantAssets } from 'pages/MerchantAssetsPage';
import { adminAssetList } from 'pages/AdminAssetListPage';
import { contactUs } from 'pages/ContactUsPage';
import { loyaltyTiers } from 'pages/LoyaltyTiersPage';
import { privacyPolicy } from 'pages/PrivacyPolicyPage';
import { faq } from 'pages/FAQPage';
import { TestPage } from 'pages/TestPage';
import { AdminRoute } from 'features/authButton/AdminRoute';

export function Routes(): JSX.Element {
  return <Switch>
            <Route exact path={landing.path} component={landing.page} />
            <Route path={whoWeAre.path} component={whoWeAre.page} />
            <Route path={loyaltyTiers.path} component={loyaltyTiers.page} />
            <Route path={contactUs.path} component={contactUs.page} />
            <Route path={privacyPolicy.path} component={privacyPolicy.page} />
            <Route path={faq.path} component={faq.page} />
            <Route path={notFound.path} component={notFound.page} />
            <Route  path={somethingWentWrong.path}  component={somethingWentWrong.page} />
            <Route path={marketplace.path} component={marketplace.page} />
            <ProtectedRoute action="accessPortfolio" path={`${merchantAssets.path}/:action?/:assetId?`} component={merchantAssets.page} />
            <ProtectedRoute path="/test" component={TestPage} />
            <AdminRoute path={adminAssetList.path} component={adminAssetList.page} />
            <Redirect exact from="/" to={landing.path} />
            <Redirect from="/" to="/not-found" />
        </Switch>
}



// export const Routes = (): JSX.Element => (
//         <Switch>
//             <Route exact path="/" component={LandingPage} />
//             <Route path="/who-we-are" component={WhoWeArePage} />
//             <Route path="/our-team" component={OurTeamPage} />
//             <Route path="/roadmap" component={RoadmapPage} />
//             <Route path="/loyalty-tiers" component={LoyaltyTiersPage} />
//             <Route path="/contact-us" component={ContactUsPage} />
//             <Route path="/privacy-policy" component={PrivacyPolicyPage} />
//             <Route path="/faq" component={FaqPage} />
//             <Route path="/not-found" component={NotFoundPage} />
//             <Route  path="/something-went-wrong"  component={SomethingWentWrongPage} />
//             <Route path={marketplaceRoute} component={MarketplacePage} />
//             <ProtectedRoute action="portfolio" path={`${merchantAssetsRoute}/:action?/:assetId?`} component={MerchantAssetsPage} />
//             <ProtectedRoute action="profile" path="/profile" component={ProfileOverviewPage} />
//             <ProtectedRoute action="profile" path="/edit-profile" component={EditProfilePage} />
//             <ProtectedRoute path="/investing" component={InvestingPage} />
//             <ProtectedRoute path="/product-chart-list" component={ProductChartListPage} />
//             <ProtectedRoute path="/portfolio" component={PortfolioPage} />
//             <ProtectedRoute path="/portfolio-tables/:table?" component={PortfolioTablesPage} />
//             <ProtectedRoute path="/item-gallery" component={ItemGalleryPage} />
//             <ProtectedRoute path="/market-item/:itemId" component={UnderConstructionPage} />
//             <ProtectedRoute path="/staking" component={UnderConstructionPage} />
//             <ProtectedRoute  path="/settings" component={UnderConstructionPage}/>
//             <ProtectedRoute path="/support" component={UnderConstructionPage} />
//             <ProtectedRoute path="/my-wallet/:userId" component={UnderConstructionPage} />
//             <ProtectedRoute path="/test" component={TestPage} />
//             <AdminRoute path="/admin/asset-list" component={AdminAssetListPage} />
//             <Redirect exact from="/" to="/" />
//             <Redirect from="/" to="/not-found" />
//         </Switch>
//     );

