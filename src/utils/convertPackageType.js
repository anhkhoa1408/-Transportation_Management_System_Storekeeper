function convertPackageType(typ) {
  switch (typ) {
    case 'explosive':
      return 'Dễ cháy nổ';
    case 'fragile':
      return 'Dễ vỡ';
    case 'smell':
      return 'Có mùi';
    case 'normal':
      return 'Thông thường';
    default:
      return 'Thông thường';
  }
}

export { convertPackageType };
