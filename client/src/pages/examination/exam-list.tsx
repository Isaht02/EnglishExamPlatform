import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { UserNav } from '@/components/user-nav'
import { IconArrowLeft } from '@tabler/icons-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { apps } from './data'
import useFetchData from '@/services/components/getData'

export default function Apps() {
  const navigate = useNavigate()
  // const [sort, setSort] = useState('ascending')
  // const [appType, setAppType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  // const { exams } = useFetchData('');

  // const filteredApps = apps
  //   .sort((a, b) =>
  //     sort === 'ascending'
  //       ? a.name.localeCompare(b.name)
  //       : b.name.localeCompare(a.name)
  //   )
  //   .filter((app) =>
  //     appType === 'connected'
  //       ? app.connected
  //       : appType === 'notConnected'
  //         ? !app.connected
  //         : true
  //   )
  //   .filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()))
  const { data } = useFetchData('/api/exam')
  // console.log(data)
  return (
    <Layout fixed>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <div className='flex w-full items-center justify-between'>
          <Button
            variant='ghost'
            className='relative h-8 w-8 rounded-full'
            onClick={() => navigate(-1)}
          >
            <IconArrowLeft className='absolute' />
          </Button>
          <div className='flex items-center space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>
      </Layout.Header>

      {/* ===== Content ===== */}
      <Layout.Body className='flex flex-col'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Examinations</h1>
          <p className='text-muted-foreground'>
            Here&apos;s a list of your Examinations!
          </p>
        </div>
        <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
          <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
            <Input
              placeholder='Filter exams...'
              className='h-9 w-40 lg:w-[250px]'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className='w-16'>
              <SelectValue>
                <IconAdjustmentsHorizontal size={18} />
              </SelectValue>
            </SelectTrigger>
            <SelectContent align='end'>
              <SelectItem value='ascending'>
                <div className='flex items-center gap-4'>
                  <IconSortAscendingLetters size={16} />
                  <span>Ascending</span>
                </div>
              </SelectItem>
              <SelectItem value='descending'>
                <div className='flex items-center gap-4'>
                  <IconSortDescendingLetters size={16} />
                  <span>Descending</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select> */}
        </div>
        <Separator className='shadow' />
        <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-4'>
          {Array.isArray(data) ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.map((exam: any, index: any) => (
              <Card className='' key={`exam-${index}`}>
                <div className='rounded-lg p-4 hover:shadow-md'>
                  <h2 className='mb-1 font-semibold'>{exam.title}</h2>
                  <Separator className='my-2' />
                  <div className='space-y-1 text-sm text-gray-500'>
                    <p>Types: 1 correct answer</p>
                    <p>Time: {exam.duration || 0} minutes</p>
                    <p>Total Marks: 100</p>
                    <p>
                      Descriptions: Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Optio, corporis dolore? Nobis, aliquam
                      explicabo necessitatibus ullam tenetur, architecto autem
                      magnam molestiae.
                    </p>
                  </div>
                  <Separator className='my-2' />
                  <div className='mt-4 flex items-center justify-between'>
                    <Button
                      size='sm'
                      className='w-full'
                      onClick={() => navigate(`/examination/test/${exam._id}`)}
                    >
                      Join
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </ul>
      </Layout.Body>
    </Layout>
  )
}
