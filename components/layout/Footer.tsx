<div className="flex gap-2">
  {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
    
      key={i}
      href="#"
      className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#F4720B] flex items-center justify-center transition-colors"
      onClick={(e) => { e.preventDefault(); alert('Social media pages coming soon!') }}
    >
      <Icon size={15} />
    </a>
  ))}
</div>
