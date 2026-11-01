# Christi Rich Picks — Netlify website

A responsive static affiliate-marketing website. It includes a product catalogue, search/category filters, affiliate-link buttons, a Netlify Forms contact form, legal starter pages, social links and a Decap CMS configuration starter.

## 1. Before launch — edit your details

Open `site-config.js` and replace:
- `contactEmail` with an email address you can access.
- `facebookUrl` with your actual Facebook Page URL.
- `whatsappNumber` with your WhatsApp number in international format, digits only (Kenya example: `2547XXXXXXXX`).

Update the placeholder contact email in `privacy.html`, `terms.html`, `disclosure.html`, and the contact section of `index.html`.

## 2. Add real products and affiliate links

Edit `data/products.json`. It has this structure:

```json
{
  "products": [
    {
      "id": "unique-product-id",
      "name": "Product name",
      "category": "Tech",
      "description": "A short, honest description.",
      "price": "2499",
      "currency": "KES",
      "image": "/assets/uploads/product-photo.jpg",
      "retailer": "Jumia",
      "affiliateUrl": "https://YOUR-APPROVED-AFFILIATE-TRACKING-LINK",
      "retailerUrl": "https://www.jumia.co.ke/",
      "featured": true
    }
  ]
}
```

Use categories exactly: `Tech`, `Fashion`, `Home`, `Beauty`, `Everyday`. Each `id` must be unique. Put your approved affiliate tracking URL in `affiliateUrl`; the main shopping button only becomes active when this field contains a valid URL. Do not invent tracking URLs or use ordinary retailer links as affiliate links. Only publish links from programmes that have approved your account. Product photos must be yours, licensed, or supplied for affiliate use by the retailer/programme. Check image-use rules.

The sample products are placeholders, not actual product endorsements or verified offers. Replace their descriptions, retailer names, images and links before launch. You can remove any sample product.

## 3. Deploy to Netlify (free starter hosting)

1. Create/sign in to GitHub and create a new **private or public** repository named `christi-rich-picks`.
2. Upload the contents of this folder to the repository root (not the ZIP file itself). Keep `index.html` at the root.
3. Sign in to Netlify and choose **Add new site → Import an existing project**.
4. Connect GitHub and select your repository.
5. Build command: leave blank. Publish directory: `.` (a single dot).
6. Deploy. Netlify will give you a temporary `*.netlify.app` URL.
7. Open the deployed site and submit the contact form once. In Netlify, open **Forms** and check that the submission appears. If Forms are not detected, trigger a fresh deploy after ensuring `index.html` contains the form markup.

## 4. Connect a professional custom domain

1. Buy a domain from a registrar (for example, a `.com` domain). Check current prices and renewal fees before paying.
2. In Netlify open **Site configuration → Domain management → Add a domain** and enter the domain you bought.
3. Follow the exact DNS records Netlify displays. Add them at your registrar; do not guess DNS values.
4. Set the preferred primary domain (for example, `www.yourdomain.com`) and enable HTTPS in Netlify once DNS has propagated.
5. Replace the placeholder URL in `robots.txt` with your actual domain and add a sitemap before submitting the site to search engines.

The domain name is not included in this project and must be purchased separately. A domain does not automatically generate traffic or affiliate commissions.

## 5. Product editing / admin options

The simplest safe editing workflow is to edit `data/products.json` in GitHub and commit the change. Netlify automatically redeploys when connected to GitHub.

An optional Decap CMS starter is included at `/admin/`. Before using it, configure the GitHub repository and a supported authentication provider. Open `admin/config.yml` and replace:
- `YOUR_GITHUB_USERNAME/YOUR_REPOSITORY`
- `YOUR_NETLIFY_SITE.netlify.app`

The sample CMS config is a starting point only. A GitHub OAuth/authentication service must be configured and tested before editors can sign in. Do not expose a GitHub personal access token in browser code or commit secrets to this repository. Until CMS authentication is configured, use the GitHub file-editing method above.

## 6. Contact form

The form uses Netlify Forms. After deployment:
- Check Netlify **Forms** to confirm it was detected.
- Set notification emails under the form's notification settings.
- Test from the live website.
- Review access and retention of submissions.

## 7. Facebook and WhatsApp

Update `site-config.js`. The homepage links to your Facebook Page and WhatsApp. For WhatsApp, use country code 254 followed by your number without the leading 0 or plus sign, e.g. `2547XXXXXXXX`.

For Facebook sharing, publish useful product comparisons and guides with a link to the matching page. Avoid spammy repeated link drops. Disclose affiliate relationships clearly in posts as well as on the website.

## 8. Important business and compliance checks

- Apply to affiliate programmes and wait for approval before using affiliate tracking links.
- Check each programme's rules for social traffic, website requirements, link shortening, paid ads, geographic eligibility, disclosure wording and payment thresholds.
- Replace all sample content with truthful, current product information.
- Review the privacy policy against the actual services, cookies, analytics, pixels, form processing and data flows you use. It is a starter template, not legal advice.
- Keep the affiliate disclosure visible and close to recommendations.
- Do not claim a product is tested or personally used unless that is true.
- Confirm prices, shipping, returns and availability with the retailer.
- This project does not include a payment checkout or sell products directly. Customers complete purchases on retailer websites.

## 9. Local preview

You can preview locally using a simple static server, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`. The contact form will only submit once deployed on Netlify.
