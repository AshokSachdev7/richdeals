# microSD Card Guide for India: A1, A2, U1, U3, V30 - Which One to Buy

The right microSD card in India comes down to three codes printed on the pack: the **U or V rating** (how fast it can write video), the **A rating** (how well apps run from it) and the **capacity**. For a phone that only stores photos and 1080p video, a U1/V10 card is enough. For 4K video, a drone or an action camera, buy U3/V30. For a CCTV camera or dashcam, speed matters less than endurance. This guide decodes each code, matches memory cards to devices, shows what a few live cards cost today and ends with a way to catch a fake.

## What the codes on a microSD card actually mean

- **Class 10:** the oldest label. It promises at least 10 MB/s sustained writing. It says nothing about app speed.
- **U1 / UHS Speed Class 1:** the same 10 MB/s minimum write as Class 10, on the UHS bus.
- **U3 / UHS Speed Class 3:** at least 30 MB/s minimum write. This is the entry ticket for 4K video.
- **V10, V30, V60, V90:** Video Speed Class. The number is the minimum sustained write in MB/s. V30 is roughly equal to U3 for everyday purposes; V60 and V90 exist for cinema cameras and you will not need them.
- **A1 and A2:** Application Performance Class, about random reads and writes of small files, which is what apps do. A1 guarantees 1,500 read and 500 write operations per second. A2 raises that to 4,000 read and 2,000 write, but only on devices that support the required command queue.
- **Headline speed such as "190 MB/s":** this is a maximum read speed under ideal conditions. It is not a guarantee for writing. Judge a card by its U/V number, not by the big number on the front.

## Which card for which device

**Phone for photos, music and 1080p video.** U1 or V10 is plenty. A1 helps if you move apps or games to the card, but most modern phones keep apps on internal storage anyway.

**Phone recording 4K, or a drone or action camera.** Buy U3/V30. A U1 card may start recording and then stop with a "card too slow" warning when the buffer fills.

**Nintendo Switch or a handheld gaming PC.** Games load from random reads, so A1 or A2 with a U3 card gives a smoother result than a bare U1 card. Check the device's maximum supported capacity first.

**Home CCTV or Wi-Fi camera.** These overwrite the same blocks day and night, and ordinary cards wear out. Look for a card sold specifically as high-endurance or for surveillance use, and size it to the recording days you want. Check the camera's supported maximum before buying, because many budget cameras cap at 128 GB or 256 GB.

**Dashcam.** Same logic as CCTV: constant loop recording, plus heat from a windscreen in an Indian summer. High-endurance, branded, from an authorised seller.

**Tablet or laptop with a card slot for backups.** Capacity and price per GB matter more than speed. U1 is fine.

## Capacity: how much do you need?

Cards up to 32 GB are SDHC and format as FAT32. Cards above 32 GB are SDXC and ship as exFAT. Older cameras and some car stereos only read SDHC, so a 128 GB card can show "card error" there even when it is genuine. A rough rule: 64 GB for a phone that mostly holds music and photos, 128 GB for regular 1080p video, and 256 GB or more only if you shoot 4K or run CCTV for a week or more.

## What a few live microSD cards cost on RichDeals right now

Prices move daily, so treat these as a snapshot taken on 28 October 2026. Always open the page for the current price and read the exact rating printed on the pack.

| Card | Price now | Where it fits |
|---|---|---|
| [Kingston Canvas Select Plus 128GB](/kingston-canvas-select-plus-128gb-microsd-card-b0fcztysn6) | ₹1,999 (list ₹3,400) | Phone storage and general use from a known brand |
| [SanDisk 128GB Ultra Go microSD, UHS-I](/sandisk-128gb-ultra-go-microsd-card-uhs-i-up-to-190mbs-full-hd-video-memory-card-for-android-smartphones-tablets-10-year-warranty) | ₹2,502 (list ₹6,000) | Android phones and tablets; listing mentions a 10-year warranty |
| [SanDisk 256GB Ultra Go microSD](/sandisk-256gb-ultra-go-microsd-uhs-i-190mb-s-b0gwvvpmnd) | ₹5,299 (list ₹10,500) | Larger library; compare price per GB with the 128 GB |
| [Amazon Basics 256GB microSDXC 180MB/s, 4K ready](/amazon-basics-256gb-microsdxc-180mbps-4k) | ₹1,679 (list ₹5,699) | Cheapest per GB here; confirm the U3/V30 print on the pack for 4K |
| [CP PLUS 128GB microSDXC UHS-3](/cp-plus-128gb-microsdxc-uhs-3-memory-card) | ₹2,249 (list ₹7,100) | Listed as UHS-3; a sensible match for a CP Plus camera |
| [KEXIN 64GB microSDXC, pack of 2, Class 10 U1](/kexin-64gb-microsd-memory-card-pack-of-2-class-10-b07wwwgv4w) | ₹2,198 (list ₹4,999) | Two cards for basic phone or tablet use |

A word on those "list" prices: the crossed-out figure is the seller's MRP, and memory cards are rarely sold at MRP. Compare the current price with the same capacity from two other brands instead of trusting the discount percentage. For example, the Amazon Basics 256 GB at ₹1,679 works out to about ₹6.56 per GB, against about ₹20.70 per GB for the SanDisk 256 GB at ₹5,299. That gap is real money. Whether the better-known card is worth it depends on the device: for a phone gallery, probably not; for a camera you rely on, a recognised brand with a warranty is the safer purchase.

More current prices are on our [offers page](/offers).

## How to spot a fake or counterfeit microSD card

Fake cards are a known problem on marketplaces. A counterfeit usually has its firmware set to report a large capacity (say 256 GB) while holding only 16 or 32 GB of real memory. It works until you pass the real limit, then files silently corrupt.

1. **Buy from the brand's store or an authorised seller** on Amazon or Flipkart, and avoid unbranded third-party sellers with prices far below the market.
2. **Check the print.** Blurry logos, uneven lettering and a missing batch code are warning signs.
3. **Run a full-capacity test on arrival.** On Windows, H2testw writes test files across the entire card and reads them back. On macOS or Linux, F3 (`f3write` and `f3read`) does the same. If any sectors fail, return the card straight away.
4. **Use the return window.** Test within the first few days, while Amazon and Flipkart returns are still open.

## Mistakes buyers make

- Buying a card for 4K video because it says "190 MB/s", when that is a read figure.
- Putting a CCTV camera on a standard consumer card and being surprised when it fails within months.
- Ignoring the device's maximum supported capacity.
- Reading the MRP discount as a quality signal.
- Never formatting a new card inside the device that will use it.

## FAQ

**Is Class 10 enough for a phone?**
For photos, music and 1080p video, yes. For 4K recording, pick U3 or V30.

**What is the difference between A1 and A2?**
A1 guarantees 1,500 random reads and 500 random writes per second. A2 guarantees 4,000 and 2,000, but the phone or console must support A2 for the gain to show up.

**Can I use a 256 GB card in an old phone or camera?**
Only if the device supports SDXC and that capacity. If it does not, it will either not read the card or ask you to format it.

**Which microSD card is best for CCTV?**
A high-endurance card from a recognised brand, within the camera's supported capacity. Ordinary consumer cards are built for occasional writing, not constant overwriting.

**How do I know if my microSD card is fake?**
Run H2testw on Windows or F3 on macOS and Linux. A genuine card passes with zero errors across its full advertised capacity.
