import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/language-provider'
import { Button } from '@/components/ui/button'
import { EnglishFlagIcon, GermanFlagIcon } from '@/components/language-flags'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// The trigger shows the flag of the ACTIVE language (issue #1318) so
// the control communicates its current state without being opened --
// a globe icon forces a click to find out which language you are in.
export function LanguageSwitch() {
  const { t } = useTranslation('common')
  const { language, setLanguage } = useLanguage()

  const ActiveFlag = language === 'de' ? GermanFlagIcon : EnglishFlagIcon

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='scale-95 rounded-full'>
          <ActiveFlag className='size-[1.2rem] rounded-full' />
          <span className='sr-only'>{t('config.language.title')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setLanguage('en')}>
          <EnglishFlagIcon className='me-2 size-4 rounded-full' />
          {t('config.language.english')}
          <Check
            size={14}
            className={cn('ms-auto', language !== 'en' && 'hidden')}
          />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('de')}>
          <GermanFlagIcon className='me-2 size-4 rounded-full' />
          {t('config.language.german')}
          <Check
            size={14}
            className={cn('ms-auto', language !== 'de' && 'hidden')}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
