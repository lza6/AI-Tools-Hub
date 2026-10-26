from playwright.sync_api import sync_playwright
import base64
import os

base = r'C:\Users\Administrator.DESKTOP-EGNE9ND\Desktop\听风军火库（code）\AI-Tools-Hub'
with sync_playwright() as p:
    b = p.chromium.connect_over_cdp('http://127.0.0.1:9222')
    page = b.contexts[0].pages[0]
    client = page.context.new_cdp_session(page)
    page.wait_for_timeout(3000)
    data = client.send('Page.captureScreenshot', {'format': 'png'})
    with open(os.path.join(base, 'v3-5tools.png'), 'wb') as f:
        f.write(base64.b64decode(data['data']))
    print('SHOT-OK', flush=True)
