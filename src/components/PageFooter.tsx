
export default function PageFooter() {
  const contactList = [
    { title: 'Email', content: 'example@example.com' },
    { title: 'Phone', content: '0000-0000' },
    { title: 'Address', content: '123 Main St., Suite A, New York, 10001' }
  ]

  return (
    <div className="max-w-content mx-auto bg-gray-800 text-gray-100 px-20 mt-16 rounded-3xl">
      <div className="py-10">
        <div className="text-right w-1/3 px-10">
          <h6 className="text-xl">Contact Us</h6>
          {
            contactList.map(item => (
              <div key={item.title} className="mt-5">
                <p>{ item.title }</p>
                <p className="text-sm text-gray-400">{ item.content }</p>
              </div>
            ))
          }
        </div>
        <div className="w-1/3 px-10"></div>
        <div className="w-1/3 px-10"></div>
      </div>
      <div className="text-center py-4 border-t border-gray-600 text-xs text-gray-400">
        Copyright © FRUIT 2024
      </div>
    </div>
  )
}