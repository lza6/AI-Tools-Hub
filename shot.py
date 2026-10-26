from playwright.sync_api import sync_playwright
import base64
import os

base = r'C:\Users\Administrator.DESKTOP-EGNE9ND\Desktop\听风军火库（code）\AI-Tools-Hub'
with sync_playwright() as p:
    b = p.chromium.connect_over_cdp('http://127.0.0.1:9222')
    page = b.contexts[0].pages[0]
    client = page.context.new_cdp_session(page)
    def shot(name):
        data = client.send('Page.captureScreenshot', {'format': 'png'})
        with open(os.path.join(base, name), 'wb') as f:
            f.write(base64.b64decode(data['data']))
        print(name, 'OK', flush=True)
    page.reload()
    page.wait_for_timeout(3000)
    shot('v-market.png')
    page.click('[data-page="logs"]')
    page.wait_for_timeout(2000)
    shot('v-logs.png')
    # 验证复制按钮存在并点击（不验证剪贴板内容，只验证不报错）
    page.click('#lg-copy')
    page.wait_for_timeout(800)
    print('COPY-BTN:', page.evaluate("document.getElementById('lg-copy').textContent"))
    print('CARD-COUNT:', page.evaluate("document.querySelectorAll('.card').length"))
