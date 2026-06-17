<div className="flex gap-2">
  {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
    <button
      key={i}
      onClick={() => alert('Social media pages coming soon!')}
      className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#F4720B] flex items-center justify-center transition-colors"
    >
      <Icon size={15} />
    </button>
  ))}
</div>
