'use client'
import Markdown from '../ui/Markdown'

export default function Campaign() {
  const markdown = `
### Campaign

#### Operation 1 - The Facility

|**Mission**|**TimMP**|**VinceMP**|**Winner**|**Date**|
|-----|:-----:|:-----:|:-----:|-----|
|1.1 - Defend|1|6|Vince|08 Jun 2025|
|1.2 - Infiltrate|6|0|Tim|08 Jun 2025|
|1.3 - Bug Bounty||||15 Jun 2025|
|**Total**|7|6|T: 1 - V: 1||

#### Operation 2 - The Ruined City

|**Mission**|**TimMP**|**VinceMP**|**Winner**|**Date**|
|-----|:-----:|:-----:|:-----:|-----|
|2.1 - Rivals|||||
|2.2 - Scavenge|||||
|2.3 - Control|||||
|**Total**|||||

#### Operation 3 - The Jungle

|**Mission**|**TimMP**|**VinceMP**|**Winner**|**Date**|
|-----|:-----:|:-----:|:-----:|-----|
|3.1 - Retrieve Intel|||||
|3.2 - Intercept|||||
|3.3 - Eradicate|||||
|**Total**|||||

#### Conclusion

[TBD]`

  return (
    <Markdown>
      {markdown}
    </Markdown>
  )
}
